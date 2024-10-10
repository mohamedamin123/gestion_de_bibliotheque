package org.bibliotheque.bibliotheque.util.enumm;

public enum Type {
    EDUCATION("Education"),
    AMOUR_RELATIONS("Amour et relations"),
    DEVELOPPEMENT_PERSONNEL("Developpement personnel"),
    FAMILLE_PARENTALITE("Famille et parentalite"),
    VOYAGES("Voyages"),
    SANTE_BIEN_ETRE("Sante et bien-etre"),
    ARTS_CREATIVITE("Arts et creativite"),
    SOCIETE_CULTURE("Societe et culture");

    private final String displayName;

    // Constructor to initialize the display name
    Type(String displayName) {
        this.displayName = displayName;
    }

    // Getter for display name
    public String getDisplayName() {
        return displayName;
    }

    // Method to get enum from display name
    public static Type fromDisplayName(String displayName) {
        for (Type type : Type.values()) {
            if (type.getDisplayName().equalsIgnoreCase(displayName)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown display name: " + displayName);
    }
}
