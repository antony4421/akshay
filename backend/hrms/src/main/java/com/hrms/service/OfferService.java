package com.hrms.service;

import com.hrms.entity.Offer;
import com.hrms.repository.OfferRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OfferService {

    private final OfferRepository offerRepository;

    public OfferService(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    public Offer createOffer(Offer offer) {
        return offerRepository.save(offer);
    }

    public Optional<Offer> updateOffer(Long id, Offer newOffer) {
        return offerRepository.findById(id).map(offer -> {
            offer.setProductName(newOffer.getProductName());
            offer.setPrice(newOffer.getPrice());
            offer.setImage(newOffer.getImage());
            return offerRepository.save(offer);
        });
    }

    public void deleteOffer(Long id) {
        offerRepository.deleteById(id);
    }
}
