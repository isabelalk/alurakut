import React, { useState } from 'react';
// Hook do NextJS
import { useRouter } from 'next/router';
import nookies from 'nookies';

export default function LoginScreen() {
    const router = useRouter();
    const [githubUser, setGithubUser] = useState('isabelalk');
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)

    const handleLogin = (infosDoEvento) => {
        infosDoEvento.preventDefault();
        // alert('Alguém clicou no botão!')
        console.log('Usuário: ', githubUser)
        setIsLoading(true)
        fetch('https://alurakut.vercel.app/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ githubUser })
        })
            .then(async (respostaDoServer) => {
                const dadosDaResposta = await respostaDoServer.json()
                const token = dadosDaResposta.token;
                // NOOKIES : EXTENSÃO DO Next.JS
                nookies.set(null, 'USER_TOKEN', token, {
                    path: '/',
                    maxAge: 86400 * 7
                })
                const { isAuthenticated } = await fetch('http://localhost:3000/api/auth', {
                    headers: {
                        Authorization: token
                    }
                }).then(resposta => resposta.json());

                setIsLoading(false)
                if (isAuthenticated) {
                    router.push('/')
                } else {
                    setError(true)
                    console.log(dadosDaResposta)
                }
            })

    }

    return (
        <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <div className="loginScreen">
                <section className="logoArea">
                    <img src="https://alurakut.vercel.app/logo.svg" />

                    <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
                    <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
                    <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
                </section>

                <section className="formArea">
                    <form className="box" onSubmit={handleLogin}>
                        <p>
                            Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
                        </p>
                        <input
                            placeholder="Usuário"
                            value={githubUser}
                            onChange={(evento) => {
                                setGithubUser(evento.target.value)
                            }}
                            style={{
                                border: error ? 'solid 1px red' : ''
                            }}
                        />
                        {githubUser.length === 0
                            ? 'Preencha o campo'
                            : ''
                        }
                        <button type="submit">
                            {isloading ? 'Carregando...' : 'Login'}
                        </button>
                    </form>

                    <footer className="box">
                        <p>
                            Ainda não é membro? <br />
                            <a href="/login">
                                <strong>
                                    ENTRAR JÁ
                                </strong>
                            </a>
                        </p>
                    </footer>
                </section>

                <footer className="footerArea">
                    <p>
                        © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
                    </p>
                </footer>
            </div>
        </main>
    )
}