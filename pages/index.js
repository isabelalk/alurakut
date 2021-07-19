import React, { useEffect, useState } from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../Sources/MainGrid'
import Box from '../Sources/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../Sources/lib/AlurakutCommuns'
import { AlurakutProfileSidebarMenuDefault } from '../Sources/lib/AlurakutCommuns'
import { ProfileRelationsBoxWrapper } from '../Sources/ProfileRelations'

//const Title = styled.h1`
//  font-size: 50px;
//  color: ${({ theme }) => theme.colors.primary};
//`

function ProfileSidebar(propriedades) {
  console.log(propriedades);
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={'https://github.com/${propriedades.githubUser}'}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}
function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {/* {seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const usuarioAleatorio = props.githubUser;
  const [isloading, setIsLoading] = useState(false)

  const [comunidades, setComunidades] = useState([
    {
      id: '125',
      title: 'eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    },
  ]);

  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobruno',
    'felipefialho',
    "thlindustries"
  ]
  const [seguidores, setSeguidores] = useState([]);

  const handleCriaComunidade = (e) => {
    e.preventDefault();
    const dadosDoForm = new FormData(e.target);

    const comunidade = {
      title: dadosDoForm.get('title'),
      imagemUrl: dadosDoForm.get('image'),
      redirectLink: dadosDoForm.get('link'),
      creatorSlug: usuarioAleatorio,
    }

    setIsLoading(true)
    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comunidade)
    })
      .then(async (response) => {
        const dados = await response.json();
        console.log(dados.registroCriado);
        const comunidade = dados.registroCriado;
        const comunidadesAtualizadas = [...comunidades, comunidade];
        setComunidades(comunidadesAtualizadas)
        setIsLoading(false)
      })

    /**Esse cara salva as comunidades no navegador */
    // localStorage.setItem('alurakut-comunidades', JSON.stringify(comunidadesAtualizadas)); 
    /**______________________________________________________________________________________ */


  }

  console.log('seguidores antes do return', seguidores);

  // 0 - Pegar o array de dados do github 
  useEffect(function () {
    // GET 
    fetch('https://api.github.com/users/isabelalk/followers')
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
      })
    // DO DATO 
    fetch('https://graphql.datocms.com', {
      method: 'POST',
      headers: {
        'Authorization': '730423db3773408ff9ba834bd5774f',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query
        {
          allAlurakuts {
            title
            id
            imagemUrl
            creatorSlug
            redirectLink
          }
          
        }` })
    })
      // , 
      .then((response) => response.json())
      .then((respostaCompleta) => {

        const comunidadesVindasDoDato = respostaCompleta.data.allAlurakuts;
        console.log(comunidadesVindasDoDato)
        setComunidades(comunidadesVindasDoDato)
      })
  }, [])

  /**Esse useEffect é para recuperar as informações salvas das comunidades */
  // useEffect(() => {
  //   const savedComunidades = localStorage.getItem('alurakut-comunidades');
  //   setComunidades(JSON.parse(savedComunidades));
  // }, []);


  return (
    <>
      <AlurakutMenu />
      {/* <button type="button" onClick={handleChange}>Teste</button> */}
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        {/* <Box style="grid-area: welcomeArea;"> */}
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCriaComunidade} >
              <div>
                <input
                  placeholder="Qual será o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual será o nome da sua comunidade"
                  type="text"

                />
              </div>
              <div>
                <input
                  placeholder="Url de capa?"
                  name="image"
                  aria-label="Qual será o nome da sua comunidade"
                />
                <div>
                  <input
                    name="link"
                    placeholder='link'
                  />
                </div>
              </div>
              <button>
                {isloading ? 'Carregando...' : 'Criar comunidades'}
              </button>
            </form>
          </Box>
        </div>


        {/*<Box style="grid-area: profileRelationsArea;"> */}
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={itemAtual.redirectLink}>
                      <img src={itemAtual.imagemUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
export async function getServerSideProps(context) {
  // const cookies = nookies.get(context)
  // const token = cookies.USER_TOKEN
  // const { githubUser } = jwt.decode(token).githubUser;

  return {
    props: {
      githubUser: 'isabelalk'
    }, // will be passed to the page component as props
  }
}


// FINAL DA AULA 5 :
// export async function getServerSideProps(context) {
//   const cookies = nookies.get(context)
//   const token = cookies.USER_TOKEN;
//   const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
//     headers: {
//         Authorization: token
//       }
//   })
//   .then((resposta) => resposta.json())

//   if(!isAuthenticated) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       }
//     }
//   }

//   const { githubUser } = jwt.decode(token);
//   return {
//     props: {
//       githubUser
//     }, // will be passed to the page component as props
//   }
// } 