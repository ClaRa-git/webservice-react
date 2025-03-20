export const totalDuration = (objectData) => {
            // on va calculer le nombre total de secondes
            const totalSeconds =objectData?.songs &&objectData?.songs.map(function(title){
            return parseInt(title.duration);
            }).reduce(function(a, b){
                return a + b;
            }, 0);

            // on va formater les secondes en heures, minutes et secondes
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            // on retourne une chaine de caractère formatée sous la forme hh:mm:ss ou mm:ss
            return hours > 0 ? `${hours}h ${minutes}min ${seconds}s` : `${minutes}min ${seconds}s`;
        }