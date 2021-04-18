export async function createContact({email,name}) {
    const url = `https://kapil-io-lambda-functions.netlify.app/.netlify/functions/emailhandler?email=${email}&name=${name}`;
        const response = await fetch(url);
        const res = await response.json();
        if(response.ok){
            return res;
        } else throw res;
}