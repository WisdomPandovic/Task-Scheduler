import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Scheduler from "../utils/scheduler"; 
import { ReminderProvider } from '../contexts/ReminderContext';
import ImportBsJS from "@/app/importBsJS";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Schedule App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReminderProvider>
          <ImportBsJS />
          <Scheduler /> 
          {children}
          <ToastContainer />
        </ReminderProvider>
      </body>
    </html>
  );
}
