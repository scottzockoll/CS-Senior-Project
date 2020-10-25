import numpy as np
import torch.utils.data
from server.model.dataset import MovieLens


class PosNegDataset(torch.utils.data.IterableDataset):

    def __init__(self, pos: MovieLens, neg: MovieLens, neg_scale: int = 10):
        self._pos = iter(pos)
        self._neg = iter(neg)

        self.meta_data = pos.meta_data

        self.neg_per_pos = neg_scale

    def __iter__(self):
        refs = [self._pos, *[self._neg for _ in range(self.neg_per_pos)]]
        mask = [1]*len(refs)
        while True:
            for idx in range(len(mask)):
                try:
                    n = next(refs[idx])
                    print(n)
                    yield n
                except StopIteration:
                    mask[idx] = 0

            if np.sum(mask) == 0:
                return
