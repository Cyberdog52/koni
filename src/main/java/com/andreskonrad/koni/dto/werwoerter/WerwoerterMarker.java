package com.andreskonrad.koni.dto.werwoerter;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum WerwoerterMarker {
    WORDFOUND,
    WORDNOTFOUND,
    CORRECTGUESS,
    WRONGGUESS,
    MAYBEGUESS,
    WRONGTRACK,
    CLOSE;

    public static WerwoerterMarker fromString(String str) {
        switch (str) {
            case "WORDFOUND": {
                return WerwoerterMarker.WORDFOUND;
            }
            case "WORDNOTFOUND": {
                return WerwoerterMarker.WORDNOTFOUND;
            }
            case "CORRECTGUESS": {
                return WerwoerterMarker.CORRECTGUESS;
            }
            case "WRONGGUESS": {
                return WerwoerterMarker.WRONGGUESS;
            }
            case "MAYBEGUESS": {
                return WerwoerterMarker.MAYBEGUESS;
            }
            case "WRONGTRACK": {
                return WerwoerterMarker.WRONGTRACK;
            }
            case "CLOSE": {
                return WerwoerterMarker.CLOSE;
            }
        }
        return null;
    }
}
