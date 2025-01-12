const verifyEmailTemplate = ({name, url}) =>{
    return`
    <p>Dear ${name},</p>
    <p>Thank you for registering PHPMol.</p>
    <a href=${url} >
        <button style="color:black;background :orange;margin-top : 10px,padding:20px,display:block">
        Verify Email</button>
    </a>
    `
}
export default verifyEmailTemplate