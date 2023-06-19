import './globals.css'

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="h-screen flex items-center justify-center" id='root'>{children}</div>
            </body>
        </html>
    )
}