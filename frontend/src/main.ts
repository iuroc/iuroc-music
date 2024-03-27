/// <reference types="vite/client" />
import van from 'vanjs-core'
import Home from './route/home'
import { Header, Footer } from './nav'
import './scss/main.scss'
import 'bootstrap/dist/css/bootstrap.css'

van.add(document.body, Header(), Footer(), Home())