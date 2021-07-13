import MainGrid from '../Sources/MainGrid'
import Box from '../Sources/Box'
import{AlurakutMenu, OrkutNostalgicIconSet} from '../Sources/lib/AlurakutCommuns'
import {ProfileRelationsBoxWrapper} from '../Sources/ProfileRelations'


//const Title = styled.h1`
//  font-size: 50px;
//  color: ${({ theme }) => theme.colors.primary};
//`

export default function Home() {
  const githubUser = 'isabelalk'
  const pessoasfavoritas = [
    'juunegreiros', 
    'omariosouto', 
    'peas', 
    'rafaballerini', 
    'marcobruno',
    'felipefialho',
  ]

  return (
    <>
    <AlurakutMenu/>
    <MainGrid>
      {/* <Box style="grid-area: profileArea;"> */}
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <Box>
          Imagem
          <img src={`https://github.com/${githubUser}.png`} style={{borderRadius: '8px'}}/>
        </Box>
      </div>

      {/* <Box style="grid-area: welcomeArea;"> */}
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
        <h1 className="title">
              Bem vindo(a) 
            </h1>
            <OrkutNostalgicIconSet> </OrkutNostalgicIconSet>
        </Box>
      </div>

      {/*<Box style="grid-area: profileRelationsArea;"> */}
      <div className="profileArea" style={{ gridArea: 'profileRelationsArea' }}>
        <Box>
          Amigos
        </Box>
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasfavoritas.length})
            </h2>
        <ul>
          {pessoasfavoritas.map((itemAtual) => {
            return (
              <li>
                <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
              </li>
            )
          }) }
           </ul>
        </ProfileRelationsBoxWrapper>
      </div>

    </MainGrid>
    </>
  )
}
