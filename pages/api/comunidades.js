import { SiteClient } from 'datocms-client';
export default async function recebedorDeRequests(request, response) {

    if (request.method === 'POST') {
        const TOKEN = 'ff546ff2430a96f237a0519dcd4b69';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "975351",
            // modo de comunidades do Dato
            title: "Comunidade de teste",
            imagemUrl: "https://github.com/isabelalk.png",
            creatorSlug: "isabelalk"
        })

        console.log(registroCriado);

        response.json({
            dados: 'Algum dado',
            registroCriado: registroCriado,
        })
        return;
    }
response.status(404).json({
    message: "Ainda não temos nada no Git, mas no POST tem"
})
}