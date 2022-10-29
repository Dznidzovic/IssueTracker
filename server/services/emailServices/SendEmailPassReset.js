const mailjet = require ('node-mailjet');

module.exports = async(req,res,user,verificationToken)=>{
    try{
        const Mailjet = await mailjet.apiConnect(
            '1d4e307e464a73e7b6a7fbd25445b930',
            'f5ecdffb37d0c5ee203531dac45e726a',
        )


        const request =  Mailjet
        .post("send", {'version': 'v3.1'})
        .request({
            "Messages":[
                {
                "From": {
                    "Email": "stefannidzovic3@gmail.com",
                    "Name": "Stefan"
                },
                "To": [
                    {
                    "Email": user.email,
                    "Name": user.firstName
                    }
                ],
                "Subject": "Greetings from BugTracker.",
                "TextPart": "Email verification",
                "HTMLPart": `<h3>Dear ${user.firstName}, Reset your Password <a href='http://localhost:3000/${user._id}/password-reset/${verificationToken}'>here</a>!</h3><br />`,
                "CustomID": "AppGettingStartedTest"
                }
            ]
            })
            await request
            
}
catch(err){
    res.status(400).send(err);
}
}

