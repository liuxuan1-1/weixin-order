function Ajax(method, url, data, progress = null) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        try {//设置了超时时间, 防止由于该条件(即readystate等于4)成立, 进入该判断块, 下面的status读取不到, 导致抛出错误
          if (xhr.status >= 200 || xhr.status < 300 || xhr.status == 304) {
            resolve(xhr.responseText);
          } else {
            reject(new Error(xhr.statusText));
          } 
        } catch (error) {
          reject(new Error('Time out!'));
        }
      }
    }

    if (progress !== null) {//进度条
      xhr.upload.onprogress = function (event) {
        progress.innerText = `uploaded ${event.loaded} of ${event.total} bytes. percent ${Math.floor(event.loaded / event.total * 100)}%`
      }
    }
    xhr.timeout = 7000;//超时7秒
    xhr.ontimeout = function () {
      alert('time out!');
    }
    method = method.toUpperCase();
    if (method == 'GET') {
      xhr.open("GET", url);
      xhr.send();
    } else if (method == 'POST') {
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(data);
    } else {
      reject(new Error('method error'));
    }
  })
}

export default Ajax