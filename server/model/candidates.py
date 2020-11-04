


def factorize(output_folder: str, output_name: str, dataset_size: str):

    assert dataset_size in ['100k', '25m'], 'Dataset size must be one of [100k, 25m].'

    print(f'Generating FlickPick candidate selection model.')

    meta_data = Metadata(f'dataset/processed/{dataset_size}')
    train_data = ChainDataset([
        MovieLens(f'dataset/processed/{dataset_size}', 'ratings_train_pos.csv'),
        MovieLens(f'dataset/processed/{dataset_size}', 'ratings_train_neg.csv')
    ])
    train_gen = DataLoader(train_data, batch_size=256, num_workers=0)

    test_data = ChainDataset([
        MovieLens(f'dataset/processed/{dataset_size}', 'ratings_test_pos.csv'),
        MovieLens(f'dataset/processed/{dataset_size}', 'ratings_test_neg.csv')
    ])
    test_gen = DataLoader(test_data, batch_size=256, num_workers=0)

    num_users = meta_data.n_users
    num_movies = meta_data.n_movies

    path = os.path.abspath(output_folder)
    os.makedirs(path, exist_ok=True)

    model = FPNet(num_users, num_movies)
    # we're using binary-cross entropy; which has been noted to be good for this
    loss_fn = torch.nn.BCELoss()
    optimizer = torch.optim.SGD(model.parameters(), lr=lr, weight_decay=0.001)

    for current_epoch in range(1, epochs + 1):
        print('-' * 50)
        print(f'Beginning epoch {current_epoch}')
        print('-' * 50)

        t0 = time()
        train_losses: [float] = []

        model.train()

        # actual model training
        pbar = tqdm(train_gen,
                    total=meta_data.train_size // train_gen.batch_size,
                    unit_scale=train_gen.batch_size,
                    unit='sample')
        for inputs in pbar:
            if device.type == 'cuda':
                inputs = push_to_device(inputs, device)

            # forward pass
            prediction = model(inputs)

            # get the target values
            y = inputs['rating']
            # convert to float and match dim
            y = y.float().view(prediction.size())

            # calculate loss for this input
            loss = loss_fn(prediction, y)

            # backwards pass
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            # accumulate the loss for monitoring
            train_losses.append(loss.item())
            pbar.set_description(f'Epoch {current_epoch} :: Train Loss {np.mean(train_losses)*100:.02f}%')

        print(f'Finished training epoch {current_epoch}')
        print('Beginning model evaluation')
        model.eval()
        epoch_accuracy = evaluate_model(model, test_gen, meta_data)

        # print epoch statistics
        train_loss = np.mean(train_losses)
        print('-' * 50)
        print(f"Training Loss: {train_loss}")
        print(f"Test Loss: {epoch_accuracy[0]:.6f}")
        print(epoch_accuracy[1])
        print(f"Epoch {current_epoch} completed {time() - t0:.1f}s")
        print('-' * 50)
        print()

        chkpt_path = os.path.join(path, "checkpoints", output_name)
        os.makedirs(chkpt_path, exist_ok=True)
        chkpt_path = os.path.join(chkpt_path, f"{output_name}-{current_epoch:04}.mdl")

        if os.path.exists(chkpt_path):
            os.unlink(chkpt_path)

        chkpt_handle = open(chkpt_path, 'wb')
        torch.save(model, chkpt_handle)
        chkpt_handle.close()

    path = os.path.join(path, f"{output_name}.mdl")

    if os.path.exists(path):
        os.unlink(path)

    file_handle = open(path, 'wb')
    torch.save(model, file_handle)
    file_handle.close()
