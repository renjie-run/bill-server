## Status Code
状态码|含义                  |说明
-----|----------------------|----
200  |OK                    |请求成功
201  |CREATED               |创建成功
202  |ACCEPTED              |更新成功
400  |BAD REQUEST           |请求的地址不存在或者包含不支持的参数
401  |UNAUTHORIZED          |未授权
403  |FORBIDDEN             |被禁止访问
404  |NOT FOUND             |请求的资源不存在
500  |INTERNAL SERVER ERROR |内部错误

## error code
### 通用
状态码|错误信息                  |含义      |status code
-----|-------------------------|---------|-----------
0    |None                     |成功的CRUD|200
999  |unknown error            |未知错误  |500
1000 |uri not found            |资源不存在 |404
1001 |missing params           |参数不全  |400
1002 |unauthorized             |未授权    |401
1003 |invalid or expired token |401      |401

### user 相关
状态码|错误信息                   |含义          |status code
-----|--------------------------|-------------|-----------
2000 |user already exist        |用户已存在     |400
2001 |user not exist            |用户不存在     |400
2002 |wrong username or password|用户名或密码错误|400
2003 |password cannot be empty  |密码不能为空   |400
