package org.bibliotheque.bibliotheque.util.enumm;

public enum Etat {
    RESERVER("Reserver"),
    EMPRUNTER("Emprunter"),
    DISPONIBLE("Disponible");

    private final String value;

    Etat(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
