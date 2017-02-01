const URL = "https://www.reddit.com/r/all/.json";

export default async function getFrontPage() {
    // return fetch(URL)
    //     .then((forJson) => {
    //         return forJson.json();
    //     }).then((redditData) => {
    //         return redditData;
    //     });
    var forJson = await fetch(URL);
    var redditData = await forJson.json();

    return redditData;
}
