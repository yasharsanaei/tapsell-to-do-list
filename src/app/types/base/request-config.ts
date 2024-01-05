interface RequestConfig {
  url: string;
}

export interface GetRequestConfig extends RequestConfig {}

export interface GetByIdRequestConfig extends RequestConfig {
  id: string;
}

export interface PostRequestConfig<Body> extends RequestConfig {
  body: Body;
}

export interface PutRequestConfig<Body> extends RequestConfig {
  body: Body;
  id: string;
}

export interface DeleteRequestConfig extends RequestConfig {
  id: string;
}
