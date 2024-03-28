/// <reference types="vite/client" />
/// <reference path="util/types.d.ts" />
import van from 'vanjs-core'
import Home from './route/home'
import { Header, Footer } from './nav'
import './scss/main.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'aplayer/dist/APlayer.min.css'

van.add(document.body, Header(), Footer(), Home())