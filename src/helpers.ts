
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

export const limitText = (string = '', limit = 0) => {
      return string.substring(0, limit)
}

export const cvtelp = async (data) => {
  const split = data.substring(1,data.length).split(' ')
  if(split.length > 1){
    if(split[0] == '62'){
      // if(split.length > 1){
        split[0] = '0'
      // }
    } else if (split[0]['0'] != '0') {
      // if(split.length > 1){ 
        let index0 = '0'
        split[0] = index0.concat(split[0])
      // }
   
    }
  }
  
  return split.filter(e => e.trim().length).join('')
}
