import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'


import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'





// axios.defaults.baseURL = import.meta.env.VITE_AXIOS_ORIGIN
export const axiosUrl = axios.create({
    withCredentials : true,
    baseURL : import.meta.env.VITE_BASE_URL,
})
axiosUrl.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(


    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
)
