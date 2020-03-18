export async function createContact({email,name}) {
    const url = `https://relaxed-banach-dcd3be.netlify.com/.netlify/functions/emailhandler?email=${email}&name=${name}`;
        const response = await fetch(url);
        const res = await response.json();
        if(response.ok){
            return res;
        } else throw res;
}