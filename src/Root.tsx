import { Composition, staticFile } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./A4Video/Logo";
import qr from "../public/assets/images/QR.png"
import { A4VideoComposition, MainSchema } from "./compositions/Compositions";
import { z } from "zod";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {

  const defaultProps: z.infer<typeof MainSchema> = {
    audioVolume: 0.5,
    music: staticFile('music.mp3'),
    colors: {
      background: '#151515',
      backgroundText: '#FFFFFF',
      black: '#000000',
      white: '#FFFFFF',
      primary: 'rgb(255 101 0)',
      primaryText: '#FFFFFF',
      secondary: '#e38458',
      secondaryText: '#f00',
      accent: '#FFFF08',
      accentText: '#f00',
    },
    background: {
      type: 'static',
      background: 'black',
    },
    fonts: {
      primary: 'Montserrat',
      secondary: "Raleway"
    },
    transitionDuration: 30,
    scene1Duration: 190,
    scene1Props: {
      logo: staticFile('Logo.jpg'),
      title: "Smoke Show BBQ",
      subtitle: "California",
      img: staticFile("background.jpg")
    },
    scene2Duration: 230,
    scene2Props: {
      img: staticFile('logo-nobg.jpg'),
      backgroundImg: staticFile("background.jpg"),
      title: "Grill Thrills",
      qrCode: staticFile("QR.jpg"),
      mainImg: staticFile("food1.jpg") 
    },
    scene3Duration: 240,
    scene3Props: {
      img: staticFile('logo-nobg.jpg'),
      backgroundImg: staticFile("background.jpg"),
      title: "Flavor Frenzy",
      qrCode: staticFile("QR.jpg"),
      mainImg: staticFile("food2.jpg") 
    },
    scene4Duration: 230,
    scene4Props: {
      img: staticFile('logo-nobg.jpg'),
      backgroundImg: staticFile("background.jpg"),
      title: "BBQ Perfection",
      qrCode: staticFile("QR.jpg"),
      mainImg: staticFile("perfection.jpg") 
    },
    scene5Duration: 245,
    scene5Props: {
      img: staticFile('Logo.jpg'),
      backgroundImg: staticFile("background.jpg"),
      title: "Texas BBQ in California",
      qrCode: staticFile("QR.jpg"),
    },
  }
  return (
    <>
      <Composition
        id="A4VideoComposition"
        component={A4VideoComposition}
        durationInFrames={920} 
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultProps}
      />
    </>
  );
};
