
    // root to flat ID
export const  RTF= (data) => {
        let children = [];
        const flatData = data.map(m => {
          if (m.children && m.children.length) {
             children = [...children, ...m.children];
          }
          return m;
        });
      
        return flatData.concat(children.length ? RTF(children) : children);
      }
    //

