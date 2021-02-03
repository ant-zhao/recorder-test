let baseUrl= ""; //默认的url
switch (process.env.NODE_ENV) {
    case 'development':
        baseUrl = '/dev';  //测试环境中的url
        break;
    case 'vip':  
        baseUrl = '/vip';  //vip环境地址
        break
    case 'production':
        baseUrl = '/prod';  //生产环境url
        break
}
export default baseUrl;