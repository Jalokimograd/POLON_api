package pl.tass.tassspring.service;

import pl.tass.tassspring.model.dto.BrowserFilter;
import pl.tass.tassspring.model.dto.NetworkPropDTO;

public interface EntityService<T> {
    T getAllByFilter(BrowserFilter filter);
    NetworkPropDTO getNetworkPropByFilter(BrowserFilter filter);
}
