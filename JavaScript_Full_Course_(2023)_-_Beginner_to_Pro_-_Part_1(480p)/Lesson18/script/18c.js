// CAUTION! DUK WANI RESPONSE KA TABBATA 
// KA SANYA MASA AWAIT IN FRONT OF IT
async function greeting() {
    const req = await fetch('https://supersimplebackend.dev/greeting');
    const resp = await req;
    const res = await req.status;
    console.log(res);
    console.log(resp);
}

greeting();