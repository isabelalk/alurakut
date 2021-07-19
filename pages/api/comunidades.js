import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {

    if (request.method === 'POST') {
        const TOKEN = 'ff546ff2430a96f237a0519dcd4b69';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "975351",
            ...request.body,
        })

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