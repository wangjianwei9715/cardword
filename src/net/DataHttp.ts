// headers
export var headersData = [
    {url:'me/certify"',name:'Content-Type',msg:'application/x-www-form-urlencoded'}, 
    {url:'advice/upload_advice',name:'Content-Type',msg:'multipart/form-data'}
]

// opSign
export var opSignData = [
    {url:'good/topay/',sign:'payGoodCode',needOpKey:false}, 
    {url:'order/topay/',sign:'payGoodOrder',needOpKey:false},
    {url:'activity/invite/requestKey',sign:'inviteKey',needOpKey:false},
    {url:'activity/invite/getKey',sign:'inviteGetKey',needOpKey:false},
    {url:'user/login/wechat/app',sign:'wechat',needOpKey:true},
    {url:'user/login/apple',sign:'apple',needOpKey:true},
    {url:'search/good',sign:'searchSecret',needOpKey:true},
    {url:'search/query_price',sign:'searchSecret',needOpKey:true},
]

