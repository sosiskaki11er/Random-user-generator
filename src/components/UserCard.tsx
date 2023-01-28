import IUser from "../models/IUser";
import { mistakeArray } from "../services/mistakeService";

export default function UserCard (user:IUser, mistakeRate:number,index:number) {
    const userID = getId(user)
    const userName = getUserName(user)
    const userCell = user.cell
    const userAddress = getAddress(user)
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

    function getId (user:IUser) {
        return user.cell.replaceAll('-','').replace('(','').replace(')','').replace(' ','').split("").sort(()=>Math.random()-.5).join('')
    }

    function getUserName (user:IUser) {
        return `${user.name.title} ${user.name.first} ${user.name.last}`
    }

    function getAddress (user:IUser) {
        return `${probabilityGenerator(0.5,user.location.street.number)} ${probabilityGenerator(0.8,user.location.street.name)} ${probabilityGenerator(1,user.location.city)}` 
    }

    return <div className="card" key={userID}>
            <h4>{index+1} (id:{userID})</h4>
            <img src={`${user.picture.large}`} className="card-img-top"/>
            <div className="card-body">
                <h4 className="card-title fw-bold">{userProps[0]}</h4>
                <h5>{userProps[1]}</h5>
                <h5>{userProps[2]}</h5>
            </div>
           </div>

}