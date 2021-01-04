const getM3u8Url = () => {
  const obj = __APOLLO_STATE__.clients.graphqlServerClient;
  let m3u8Url = "";
  Object.keys(obj).some((key) => {
    if (key.includes("$ROOT_QUERY.playbackDetail")) {
      m3u8Url = obj[key + ".product"].m3u8Url;
      return true;
    }
    return false;
  });
  return m3u8Url;
};

const fetchUrl = (url) => {
  return fetch(url).then((val) => val.text());
};

const prefetchUrl = (url) => {
  return fetch(url, { ksPrefetch: true });
};

const start = async () => {
  const m3u8Url = getM3u8Url();
  const m3u8listStr = await fetchUrl(m3u8Url);
  const prefix = /(htt.*\/).*\.m3u8/.exec(m3u8Url)[1];
  const m3u8List = m3u8listStr
    .split("\n")
    .filter((str) => str.includes(".ts"))
    .map((str) => prefix + str);

  const prefetch = (respUrl, type) => {
    const index = Array.prototype.findIndex.call(
      m3u8List,
      (i) => i === respUrl
    );
    if (index > -1) {
      console.log(type, "prefetch", index + 2);
      console.log();
      const nextUrl = m3u8List[index + 2];
      prefetchUrl(nextUrl);
    }
  };

  injectXHRHttpRequest(prefetch);
  injectFetchReuquest(prefetch);
};

function injectFetchReuquest(prefetchCallback) {
  const prevFetch = window.fetch;
  window.fetch = function (...args) {
    if (args[1].ksPrefetch === undefined) prefetchCallback(args[0], "fetch");
    return prevFetch.apply(this, args);
  };
}

function injectXHRHttpRequest(prefetchCallback) {
  const xhr = window.XMLHttpRequest;
  window.XMLHttpRequest = function () {
    const x = new xhr();
    checkSuccess(x);
    return x;
  };

  const checkSuccess = (xhr) => {
    const respUrl = xhr.responseURL;
    if (respUrl != null) {
      prefetchCallback(respUrl, "xhr");
    } else {
      setTimeout(() => {
        checkSuccess(xhr);
      }, 0);
    }
  };
}

start();
