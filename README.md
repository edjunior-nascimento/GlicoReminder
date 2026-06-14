# GlicoReminder

Aplicativo mobile para apoio no acompanhamento de glicemia e sugestões de refeições.

O app permite registrar medições, visualizar histórico com paginação, ouvir mensagens por voz de incentivo/orientação e navegar por opções de dieta separadas por refeição.

## O que o app faz

- Registra novos valores de glicemia com data e hora.
- Lista histórico de medições em ordem decrescente.
- Carrega mais registros automaticamente ao rolar a lista.
- Classifica visualmente o estado da glicemia com cores e ícones.
- Lê mensagens por voz com `expo-speech`.
- Permite apagar um registro com confirmação.
- Exibe opções de alimentação por refeição (café da manhã, lanche, almoço, jantar etc.).
- Lê por voz as opções de dieta da refeição selecionada.

## Tecnologias utilizadas

- Expo SDK 54
- React Native 0.81.5
- React 19
- TypeScript
- React Navigation (Stack + Drawer)
- Firebase Firestore (SDK Web Lite)
- Expo Speech
- Expo Vector Icons

## Estrutura principal

- `App.tsx`: configuração de navegação (Stack e Drawer).
- `src/screens/HomeScreen`: listagem de glicemias e paginação.
- `src/screens/AddGlicemiaScreen`: teclado numérico e salvamento da medição.
- `src/screens/DietaScreen`: seleção da refeição.
- `src/screens/RefeicaoScreen`: exibição de opções alimentares por refeição.
- `src/components/CardGlicemia`: cartão de medição, leitura por voz e exclusão.
- `src/components/CardAlimento`: cartão visual de alimento e medida caseira.
- `firebase/config.js`: inicialização do Firebase e acesso ao Firestore.

## Pré-requisitos

- Node.js `>= 22.11.0`
- npm
- Ambiente Android configurado (Android SDK + dispositivo ou emulador)
- Para iOS (opcional): macOS + Xcode + CocoaPods

## Instalação

```bash
npm install
```

## Configuração Firebase

O projeto usa Firestore para salvar os registros de glicemia na coleção `glicemia`.

Arquivo atual de configuração:

- `firebase/config.js`

Observação:

- As chaves estão definidas diretamente no arquivo de configuração. Para produção, o recomendado é mover segredos para variáveis de ambiente e aplicar regras de segurança no Firestore.

# Executar a expo
npx expo start


# Executar a sdk
cd android
./gradlew clean
./gradlew installRelease -PreactNativeArchitectures=arm64-v8a

## Scripts úteis

```bash
npm start       # inicia o Expo
npm run android # roda no Android via Expo
npm run ios     # roda no iOS via Expo
npm test        # testes com Jest
npm run lint    # lint com ESLint
```

## Fluxo recomendado de uso

1. Abra o app e toque em **ADICIONAR GLICEMIA**.
2. Digite o valor usando o teclado numérico.
3. Toque em **SALVAR** para registrar no Firestore.
4. Na tela inicial, toque no card para ouvir a leitura por voz.
5. Pressione e segure o card para abrir ações como apagar.
6. Acesse **Dieta** no menu para visualizar refeições e opções.

## Testes

```bash
npm test
```

## Melhorias sugeridas

- Adicionar autenticação de usuário.
- Isolar configurações sensíveis em variáveis de ambiente.
- Criar testes para fluxos de cadastro/exclusão.
- Implementar filtros por período no histórico de glicemia.
