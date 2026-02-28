import Header from '../components/Header'


export const metadata = {
  title: 'კომპანიის სახელი | პროფესიონალური სერვისი', /* შეცვალე */
  description: 'პროფესიონალური გადაწყვეტილებები თქვენი ბიზნესისთვის — სწრაფად, საიმედოდ, შედეგზე ორიენტირებულად.', /* შეცვალე */
  icons: {
    icon: '/favicon.ico', /* public/favicon.ico */
  },
}

export default function RootLayout({children}){
  return(
    <html lang="ka">

      <body>
        <Header/>
        {children}
      </body>  

    </html>  
  )
}