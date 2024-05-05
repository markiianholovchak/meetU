export const LOCAL_STORAGE_AUTH_KEY = "auth";
export const GOOGLE_API_KEY = "AIzaSyBgwiVWylWV7fBaAQuXt-LaAzKUNoq_eI8";
export const EMAIL_REGEX = new RegExp(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
export const PASSWORD_REGEX = new RegExp(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/);
