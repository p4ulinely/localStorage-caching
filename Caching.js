const defaultExpirationTimeInMinutes = 5;

const get = (key) => {
    try {
        const val = localStorage.getItem(key);

        if (!val) return undefined;

        const data = JSON.parse(val);
        const currentDiff = new Date(data.expirationTimeLimit - Date.now())
            .getMinutes();
    
        if (currentDiff > data.diffExpirationTime){
            localStorage.clear(key);
            return undefined;
        }

        return data;
    } catch (err) {
       console.error(`Error trying to get '${key}'`, err) 
    }
}

const set = async (key, data, expirationTimeInMinutes = defaultExpirationTimeInMinutes) => {
    try {
        const expirationTimeLimit = getExpirationTime(expirationTimeInMinutes); 

        localStorage.setItem(key, JSON.stringify({
            diffExpirationTime: expirationTimeInMinutes,
            expirationTimeLimit,
            data
        }));
    } catch (err) {
       console.error(`Error trying to set key '${key}'`, err) 
    }

}

const getExpirationTime = expirationTimeInMinutes => {
    const dateNow = new Date(Date.now());
    dateNow.setMinutes(dateNow.getMinutes() + expirationTimeInMinutes);

    return dateNow.getTime();
}

export default {
    get,
    set
}
