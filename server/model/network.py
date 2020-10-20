import torch
import torch.nn.functional as f

from server.model.utilities import get_device, push_to_device


device = get_device()


LAYERS = [
    [16, 32],
    [32, 16],
    [16, 8]
]


class FPNet(torch.nn.Module):

    def __init__(self, n_users: int, n_items: int, dropout=True):
        super(FPNet, self).__init__()

        self._dropout = dropout

        self.user_embeddings = torch.nn.Embedding(n_users + 1, 8)
        self.item_embeddings = torch.nn.Embedding(n_items + 1, 8)

        self.hidden = torch.nn.ModuleList([
            torch.nn.Linear(LAYERS[0][0], LAYERS[0][1]),
            torch.nn.Linear(LAYERS[1][0], LAYERS[1][1]),
            torch.nn.Linear(LAYERS[2][0], LAYERS[2][1])
        ])

        self.output = torch.nn.Linear(LAYERS[-1][1], 1)

    def forward(self, inputs: dict):
        """
        Forward pass of the model.
        :param inputs:
        :return:
        """
        user = inputs['user_id']
        item = inputs['item_id']
        user_embedding = self.user_embeddings(user)
        item_embedding = self.item_embeddings(item)

        x = torch.cat([user_embedding, item_embedding], 1)
        for idx, _ in enumerate(range(len(self.hidden))):
            x = self.hidden[idx](x)
            x = f.relu(x)
            x = f.dropout(x, p=self._dropout, training=self.training)

        logit = self.output(x)
        rating = torch.sigmoid(logit)
        return rating

    def predict(self, inputs):
        if device.type == 'cuda':
            inputs = push_to_device(inputs, device)

        output_scores = self.forward(inputs)

        return output_scores.cpu().detach().numpy()
