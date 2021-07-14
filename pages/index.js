import React, { useEffect } from 'react'
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

export default function Home() {
  const usuarioAleatorio = 'isabelalk'
  const [comunidades, setComunidades] = React.useState([
    {
      id: '125',
      title: 'eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    },
  ]);

  // const comunidade = comunidades [0];
  // const alteradorDeComunidades/setComunidades = comunidades [1];

  console.log('teste');
  // const comunidades = ['Alurakut'];
  const pessoasfavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobruno',
    'felipefialho',
    "thlindustries"
  ]

  // const handleCriaComunidade = () =>{
    
  // }

  function handleCriaComunidade(e) {
    e.preventDefault();
    const dadosDoForm = new FormData(e.target);
    console.log('Campo: ', dadosDoForm.get('title'));
    console.log('Campo: ', dadosDoForm.get('image'));

    const comunidade = {
      id: new Date().toISOString(),
      title: dadosDoForm.get('title'),
      image: dadosDoForm.get('image')
    }

    const comunidadesAtualizadas = [...comunidades, comunidade]

    /**Esse cara salva as comunidades no navegador */
    localStorage.setItem('alurakut-comunidades', JSON.stringify(comunidadesAtualizadas));
    /**______________________________________________________________________________________ */

    setComunidades(comunidadesAtualizadas);
    // console.log('comunidades');
  }


  /**Esse useEffect é para recuperar as informações salvas das comunidades */
  useEffect(()=>{
    const savedComunidades = localStorage.getItem('alurakut-comunidades');
    setComunidades(JSON.parse(savedComunidades));
  },[]);
  /**______________________________________________________________________________________ */

  return (
    <>
      <AlurakutMenu />
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
            <OrkutNostalgicIconSet> </OrkutNostalgicIconSet>
          </Box>
          <Box>
            <h2 className="subTitle"> O que você deseja fazer? </h2>
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
                    placeholder='link'>
                  </input>
                </div>
              </div>
              <button>
                Criar Comunidade
              </button>
            </form>
          </Box>
        </div>


        {/*<Box style="grid-area: profileRelationsArea;"> */}
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos ({pessoasfavoritas.length})
            </h2>
            <ul>
              {pessoasfavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
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
