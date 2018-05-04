windows下使用sc命令创建服务

  #创建服务
  sc create test3 binPath= "C:\Users\Administrator\Desktop\win32srvDemo\win32srvdemo\Debug\win32srvDemo.exe"
  #删除服务
  sc delete test3
  #启动服务
  net start test3
  #停止服务
  net stop test3
  
  
  语法  
    
    1 Usage: sc <server> [command] [service name] <option1> <option2>...
    sc query                - 枚举活动服务和驱动程序的状态
    sc query eventlog       - 显示 eventlog 服务的状态
    sc queryex eventlog     - 显示 eventlog 服务的扩展状态
    sc query type= driver   - 仅枚举活动驱动程序
    sc query type= service  - 仅枚举 Win32 服务
    sc query state= all     - 枚举所有服务和驱动程序
    sc query bufsize= 50    - 枚举缓冲区为 50 字节
    sc query ri= 14         - 枚举时恢复索引 = 14
    sc queryex group= ""    - 枚举不在组内的活动服务
    sc query type= interact - 枚举所有不活动服务
    sc query type= driver group= NDIS     - 枚举所有 NDIS 驱动程序
    
    
-创建自启动服务
sc create nginxsrv binPath= "xxxxx" start= auto  
-删除服务
sc delete nginxsrv

注意事项：
1.sc命令需以管理员角色执行
2.sc create 参数”=”与值之间必须要有一个空格
3.创建nginx服务时，需加上-p参数指定nginx根目录。如：”C:\nginx\nginx.exe  -p C:\nginx”。若没指定nginx根目录，系统服务将启动错误。
