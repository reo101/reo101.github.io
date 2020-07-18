window.onload= () => {
    const cursor = curDot({
        zIndex: 100,
        diameter: 80,
        borderWidth: 2,
        borderColor: "#01a900",
        easing: 4,
        background: "transparent"
      });
    
      // cursor.over("span", {
      //   scale: 0.8,
      //   background: "#fff"
      // });
    
      // cursor.over("a", {
      //   scale: 0.5,
      //   background: "#fff"
      // });

      cursor.over("#aImportant", {
        scale: 0.6,
        borderColor: "red",
        background: "#ff000066"
      });
    
      cursor.over("#aCoding", {
        scale: 0.6,
        borderColor: "#01a900",
        // background: "#7289da"
        background: "#01a90066"
    
      });
    
      cursor.over("#aLegal", {
        scale: 0.6,
        borderColor: "#000000",
        // background: "#FF5700"
        background: "#55555566"
      });
    
      cursor.over("#aGames", {
        scale: 0.6,
        borderColor: "#1b39ce",
        // background: "#00acee"
        background: "#1b39ce66"
      });
    
      cursor.over("#aSteam", {
        scale: 0.6,
        borderColor: "#bbbbbb",
        // background: "#00acee"
        background: "#eeeeee66"
      });
    
      cursor.over("#aAmusement", {
        scale: 0.6,
        borderColor: "#cccc32",
        // background: "#c4302b"
        background: "#cccc3266"
      });
    
      cursor.over("#aAnime", {
        scale: 0.6,
        borderColor: "#d2548c",
        // background: "#00acee"
        background: "#d2548c66"
      });

      cursor.over("#search", {
        scale: 0.001,
        borderColor: "#ffffff",
        // background: "#00acee"
        background: "transparent"
      });

      cursor.over("#help", {
        scale: 3
      });
    
      cursor.over("img", {
        scale: 0.2,
        borderColor: "#fff"
      });
};