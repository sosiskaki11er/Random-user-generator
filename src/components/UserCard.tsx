import IUser from "../models/IUser";
import { mistakeArray } from "../services/mistakeService";

export default function UserCard (user:IUser, mistakeRate:number, key:string,index:number) {
    const userName = getUserName(user)
    const userCell = user.cell
    const userAddress = `${probabilityGenerator(0.5,user.location.street.number)} ${probabilityGenerator(0.8,user.location.street.name)} ${probabilityGenerator(1,user.location.city)}`
    let userProps = [userName,userCell,userAddress]
    userProps = mistakeGenerator(userProps, mistakeRate)

    function mistakeGenerator (props:string[],mistakeRate:number):string[] {
        if(Math.floor(Math.random()*10) >= (1.0- mistakeRate)*10) {
            mistakeRate--
            let changeProp = Math.floor(Math.random()*3)
            props[changeProp] = mistakeArray[Math.floor(Math.random()*3)](props[changeProp])
            if(mistakeRate > 0) {
                return mistakeGenerator(props,mistakeRate)
            }
            return props
        }
        return props
    }

    function probabilityGenerator(probability:number,object:string) {
        if (Math.floor(Math.random()*10) >= (1.0- probability)*10) {
            return object
        }
        else {
        return ''
        } 
    }

    function getUserName (user:IUser) {
        return `${user.name.title} ${user.name.first} ${user.name.last}`
    }

    function getAddress (user:IUser) {
        return `${probabilityGenerator(0.5,user.location.street.number)} ${probabilityGenerator(0.8,user.location.street.name)} ${probabilityGenerator(1,user.location.city)}` 
    }

    return <div className="card" key={key}>
            <h4>{index+1} (id:{key})</h4>
            <img src={`${user.picture.large}`} className="card-img-top"/>
            <div className="card-body">
                <h4 className="card-title fw-bold">{userProps[0]}</h4>
                <h5>{userProps[1]}</h5>
                <h5>{userProps[2]}</h5>
            </div>
           </div>

}