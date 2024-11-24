import './globals.css';

export const metadata = {
  title: 'Secure Application',
  description: 'Secure Application - Gusthavo Alencar - x19485176',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-..."
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400&family=Open+Sans:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font">{children}</body>
    </html>
  );
}
