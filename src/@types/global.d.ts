import { compose } from 'redux';
import store from "@/store";

declare global {
  interface Window {
    NODE_ENV: 'production' | 'development';
    PORT?: string;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
  type AppDispatch = typeof store.dispatch;
}


