import torch


def get_device():
    """
    Get PyTorch device that execution will occur on.
    :return:
    """
    use_cuda = torch.cuda.is_available()
    return torch.device("cuda:0" if use_cuda else "cpu")


def push_to_device(inputs: dict, device: torch.device):
    """
    Load input vectors onto the target device
    :param inputs:
    :param device:
    :return:
    """
    for key in inputs:
        if isinstance(type(inputs[key]), type(None)):
            inputs[key] = inputs[key].to(dtype=torch.long, device=device)

    return inputs
