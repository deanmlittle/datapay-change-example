const datapay = require('datapay'),
bsv = require('bsv');

//Set up your configuration here
let config = {
    xpriv: "<your xpriv>",
    path: "m/0'/0'/0'/",
    n: 0,
    namespace: '<your namespace>'
}

sendTx = () => {
    datapay.send({
        safe: true,
        data: [config.namespace, 'Test #' + config.n],
        pay: { key: getPayAddress() },
        change: getChangeAddress()
    }, (err, tx) => {
        if(err){
            console.log(err);
        } else {
            console.log(tx);
            config.n++;
            setTimeout(sendTx, 5000);
        }
    });
};

getPayAddress = () => {
    const hdpriv = bsv.HDPrivateKey.fromString(config.xpriv);
    return hdpriv.deriveChild(config.path + config.n).privateKey.toString();
}

getChangeAddress = () => {
    const hdpriv = bsv.HDPrivateKey.fromString(config.xpriv);
    const pubkey = hdpriv.deriveChild(config.path + (config.n+1)).publicKey;
    return bsv.Address.fromPublicKey(pubkey).toString();
}
sendTx();
