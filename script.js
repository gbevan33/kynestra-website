'use strict';
const products=[["Tirzepatide","10 mg","TR-10","https://verify.janoshik.com/tests/248439-Tirzepatide_CLISB3KKZ2WJ"],["Tirzepatide","30 mg","TR-30","https://verify.janoshik.com/tests/208263-Tirzepatide_30mg_DQRYKD9W6S35"],["Retatrutide","10 mg","RT-10","https://verify.janoshik.com/tests/248412-Retatrutide_1A89X17DNK7V"],["Retatrutide","30 mg","RT-30","https://verify.janoshik.com/tests/208254-Retatrutide_30mg_CRUQXUVRYYV8"],["Wolverine","20 mg","WV-20","https://verify.janoshik.com/tests/248447-Wolverine_F5AWSU3CNSDB"],["Tesamorelin","20 mg","TS-20","https://drive.google.com/file/d/16H5rqYqoEbO7Layf9ZpNteOuocyhKGPT/view"],["MOTS-C","40 mg","MC-40","https://verifiedbyvanguard.com/verify/e83aa07d-0bac-4aff-9087-abf83d7baed1"],["NAD+","1000 mg","ND-1000","https://greybuys.com/test-results/122"]];
const grid=document.getElementById('products');
const select=document.getElementById('interest');
for(const [name,strength,code,url] of products){
const card=document.createElement('article');card.className='item';
const art=document.createElement('div');art.className='art';art.setAttribute('aria-label','Illustrative gray silver product vial');
const vial=document.createElement('div');vial.className='vial';
const cap=document.createElement('div');cap.className='cap';
const glass=document.createElement('div');glass.className='glass';
const label=document.createElement('div');label.className='vlabel';
const strong=document.createElement('strong');strong.textContent=name+' '+strength;
const small=document.createElement('small');small.textContent=code+' · RUO';
label.append(strong,small);glass.append(label);vial.append(cap,glass);art.append(vial);
const details=document.createElement('div');details.className='details';
const h3=document.createElement('h3');h3.textContent=name+' '+strength;
const note=document.createElement('p');note.textContent='Source link available · Batch verification pending';
const link=document.createElement('a');link.href=url;link.textContent='View supplied COA source';link.target='_blank';link.rel='noopener noreferrer';
details.append(h3,note,link);card.append(art,details);grid.append(card);
const option=document.createElement('option');option.value=name+' '+strength;option.textContent=name+' '+strength;select.append(option);
}
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('inquiry').addEventListener('submit',e=>{
e.preventDefault();const name=document.getElementById('person').value.trim(),email=document.getElementById('reply').value.trim(),interest=select.value,message=document.getElementById('message').value.trim();
const subject='Kynestra research inquiry'+(interest?' - '+interest:'');
const body='Name: '+name+'\nReply email: '+email+'\nProduct: '+(interest||'General')+'\n\n'+message;
location.href='mailto:kynestrabio@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
});