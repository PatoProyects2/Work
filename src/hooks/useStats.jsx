import { doc, updateDoc } from "firebase/firestore";
import toast from 'react-hot-toast';
import { db } from "../firebase/firesbaseConfig"
export const useStats = ({ level, totalGames, discordId }) => {
    if (totalGames > 9 && totalGames < 20 && level < 2) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 2
        })
        toast('You reach level 2, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 19 && totalGames < 30 && level < 3) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 3
        })
        toast('You reach level 3, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 29 && totalGames < 40 && level < 4) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 4
        })
        toast('You reach level 4, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 39 && totalGames < 50 && level < 5) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 5
        })
        toast('You reach level 5, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 49 && totalGames < 65 && level < 6) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 6
        })
        toast('You reach level 6, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 64 && totalGames < 80 && level < 7) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 7
        })
        toast('You reach level 7, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 79 && totalGames < 95 && level < 8) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 8
        })
        toast('You reach level 8, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 94 && totalGames < 110 && level < 9) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 9
        })
        toast('You reach level 9, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 109 && totalGames < 125 && level < 10) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 10
        })
        toast('You reach level 10, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 124 && totalGames < 150 && level < 11) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 11
        })
        toast('You reach level 11, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 149 && totalGames < 200 && level < 12) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 12
        })
        toast('You reach level 12, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 199 && totalGames < 250 && level < 13) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 13
        })
        toast('You reach level 13, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 249 && totalGames < 300 && level < 14) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 14
        })
        toast('You reach level 14, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 299 && totalGames < 350 && level < 15) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 15
        })
        toast('You reach level 15, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 349 && totalGames < 390 && level < 16) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 16
        })
        toast('You reach level 16, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 389 && totalGames < 430 && level < 17) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 17
        })
        toast('You reach level 17, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 429 && totalGames < 470 && level < 18) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 18
        })
        toast('You reach level 18, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 469 && totalGames < 510 && level < 19) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 19
        })
        toast('You reach level 19, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 509 && totalGames < 550 && level < 20) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 20
        })
        toast('You reach level 20, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 549 && totalGames < 600 && level < 21) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 21
        })
        toast('You reach level 21, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 599 && totalGames < 650 && level < 22) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 22
        })
        toast('You reach level 22, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 649 && totalGames < 700 && level < 23) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 23
        })
        toast('You reach level 23, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 699 && totalGames < 750 && level < 24) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 24
        })
        toast('You reach level 24, congrats!', {
            icon: '🆙',
        });
    }
    if (totalGames > 749 && level < 25) {
        updateDoc(doc(db, "clubUsers", discordId), {
            level: 25
        })
        toast('You reach level 25, congrats!', {
            icon: '🆙',
        });
    }
};