import { Helmet } from 'react-helmet';

export default function Metadata() {
    return (
        <Helmet>
            <title>Emingi</title>
            <meta charset='UTF-8' />
            <meta name='description' content='Soyez creatif' />
            {/* description */}
            <meta name='keybord' content='Emingi, Wikipedia, les articles les plus visités' /> {/* CEO */}
            <meta name='author' content='Kali Academy' /> {/* author */}
            <meta name='viewport' content='width=device-width, initial-scale=1.0' /> {/* CEO */}
            <meta httpEquiv='Content-language' content='fr' /> {/* language */}
            <meta name='theme-color' content='#fff' /> {/* theme color for android */}
            <meta name='robots' content='index, follow' />
            {/* security metadata */}
            {/* La Content Security Policy */}
            <meta
                httpEquiv='Content-Security-Policy'
                content="default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
            />
            {/* Strict-Transport-Security (HSTS) */}
            <meta httpEquiv='Strict-Transport-Security' content='max-age=31536000; includeSubDomains' />
            {/* empêche les navigateurs d'interpréter les fichiers comme un type MIME différent de celui spécifié */}
            <meta httpEquiv='X-Content-Type-Options' content='nosniff' />
            {/* empêche votre contenu d'être intégré dans des iframes, ce qui peut aider à prévenir les attaques de type clickjacking */}
            <meta httpEquiv='X-Frame-Options' content='DENY' />
            {/* active les filtres de protection contre les scripts intersites (XSS) dans les navigateurs */}
            <meta httpEquiv='X-XSS-Protection' content='1; mode=block' />
        </Helmet>
    );
}
