import cn from './classNames';

export default () => <div className={cn.bootstrapped}>
    <input className={cn.numberInput} placeholder="Page number" type="number" />
    <button className={cn.xhrButton} disabled>Get</button>
    <p className={cn.textField}></p>
</div>