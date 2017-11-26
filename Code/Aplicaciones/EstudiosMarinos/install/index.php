 <html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    <link id="q" rel="stylesheet" type="text/css" href="../Framework/Client/ExtJs/resources/css/ext-all-neptune.css"/>
    <link id="w" rel="stylesheet" type="text/css" href="../Framework/Client/FrKCss/css/bootstrap.css"/>
    <link id="d" rel="stylesheet" type="text/css" href="../Framework/Client/FrKCss/css/bootstrap-responsive.css"/>
    <link id="g" rel="stylesheet" type="text/css" href="../Framework/Client/FrKCss/js/google-code-prettify/prettify.css"/>
    <link id="i" rel="stylesheet" type="text/css" href="../App/Client/css/1App.css"/>
    <link id="f" rel="stylesheet" type="text/css" href="css/styles.css"/>

    <script src="../Framework/Client/FrKCss/js/jquery.js"></script>
    <script src="../Framework/Client/FrKCss/js/google-code-prettify/prettify.js"></script>
    <script src="../Framework/Client/FrKCss/js/bootstrap.js"></script>
    <script src="../Framework/Client/FrKCss/js/bootstrap-dropdown.js"></script>
    <script src="../Framework/Client/FrKCss/js/bootstrap-alert.js"></script>
    <script src="../Framework/Client/FrKCss/js/bootstrap-button.js"></script>
    <script src="../Framework/Client/FrKCss/js/bootstrap-tooltip.js"></script>
    <script src="../Framework/Client/FrKCss/js/bootstrap-popover.js"></script>
    <script src="../Framework/Client/FrKCss/js/bootstrap-collapse.js"></script>
    <script src="../Framework/Client/FrKCss/js/bootstrap-transition.js"></script>
    <script src="../Framework/Client/FrKCss/js/bootstrap-modal.js"></script>
    <script src="../Framework/Client/FrKCss/js/bootstrap-scrollspy.js"></script>
    <script src="../Framework/Client/FrKCss/js/bootstrap-tab.js"></script>
    <script src="../Framework/Client/FrKCss/js/bootstrap-carousel.js"></script>
    <script src="../Framework/Client/FrKCss/js/bootstrap-typeahead.js"></script>
    <script src="../Framework/Client/FrKCss/js/bootstrap-affix.js"></script>

    <script src="../Framework/Client/ExtJs/ext-all.js"></script>
    <script src="../Framework/Client/ExtJs/ext-theme-neptune-dev.js"></script>
    <script src="../Framework/Client/ExtJs/locale/ext-lang-es.js"></script>
    <script src="jss/main.jquery.js"></script>

</style></head>
<body class="view-login">
<div class="container-fluid"  style="margin:5%;height:auto; min-height:100%;">
    <!-------------------------------------------------Tab del sitio----------------------------------------------------->
        <div id="info"></div>
        <ul id="myTab" class="nav nav-tabs">
            <li id="a" class="active">
                <a href="#home" data-toggle="tab">
                     <div id="inicio" class="badge badge-warning">
                         <i class="icon-home icon-white"></i>
                     </div>
                </a>
            </li>
            <li id="b">
                <a href="#profile" data-toggle="tab">
                   <div id="conf" class="badge badge-info">1.</div> Configuración
                </a>
            </li>
            <li id="c">
                <a href="#dropdown1" data-toggle="tab">
                    <div id="bd" class="badge badge-info">2.</div> Base de Datos
                </a>
            </li>
            <li id="z">
                <a href="#dropdown2" data-toggle="tab">
                    <div id="genral" class="badge badge-info">3.</div> Visión General
                </a>
            </li>
            </li>
    </ul>
        <div id="myTabContent" class="tab-content sbsist" style="height:auto; min-height:100%; width-min:99%;width:100%">
        <div class="tab-pane fade in active" id="home"><div class="">
            <div style="float:right;"><img src="img/banner.png">
                <div id="licence"><br>ARKiT es software libre liberado bajo la <b>GNU General Public License.</b></div></div>
            Uno de los grandes retos a los que nos enfrentamos al intentar utilizar las nuevas tecnologias en la vida diaria de una empresa es sin duda
            el equipamiento necesario para implantralas.<br>
            La Agencia de Investigacion y Desarrollo (I+D. Geocuba-Pinar del Rio) es, sin duda, una opcion para todos aquellos que hoy lo intentan, aun mas si es por primera vez.
            En esta ocacion les presentamos Hermes (Sistema para la gestion del capital humano), confiable,rapido y de buen gusto son algunos de
            los comentarios sobre esta nueva aplicacion de gestion que hoy ponemos a su dispocicion.<br><br>

            <b>Requerimientos del Sistema (Sevidor) :</b><br>
            <span class="label label-info">1-</span> Servidor Web (XAMMP,WAMMP,...).<br>
            <span class="label label-info">2-</span> Ancho de banda ( =< 128 Mg/bits).<br>
            <span class="label label-info">3-</span> ESpacio Libre en disco (500 Mg)<br>
            <span class="label label-info">4-</span> Servidor de Base Datos (PostgresSQL,MYSQL,SQL Server,).<br>
            <span class="label label-info">5-</span> Memoria Ram superior a 2Gb.<br>
            <span class="label label-info">6-</span> Micro Procesador de 3.2 Gb.<br><br>

            <b>Requerimientos del Sistema (Cliente):</b><br>
            <span class="label label-info">1-</span> Navegador Web (Preferentemente Google Chrome).<br>
            <span class="label label-info">2-</span> Conexion de Red.<br>
            <span class="label label-info">3-</span> Memoria Ram superior a 512Mb.<br>
            <span class="label label-info">4-</span> Micro Procesador de 1.5 Gb.<br>
    </div></div>
        <div class="tab-pane fade" id="profile">
        <h3>Configuración Principal</h3>
            <table style="width:100%">
                <tbody>
                <tr>
                    <td>
                        <div class="alert alert-info" style=" float:left;width:49.5%;min-height:100%;">
                            <h4>Configuración del Sitio</h4><br>
                            <label>Nombre del sitio * <input type="text" id="nombre_sitio" placeholder=" Nombre de su sitio " required="true"></label>
                            <label>Descripción del sitio <textarea id="desc_sitio"style="width:99%" rows="5" ></textarea></label>
                           Iniciar sistema en modo de:
                            <div class="btn-group" data-toggle="buttons-radio">
                                <button type="button" class="btn btn-rct" id="debug">Debug</button>
                                <button type="button" class="btn btn-rct" id="test">Testing</button>
                                <button type="button" class="btn btn-rct" id="relase">Release</button>
                            </div>
                            <p>
                                Los modos de inicio de sistema dan la oportunidad a el usuario de:
                            <div id="Construcción_"><br><br>
                                <span id="Construcción_1" class="badge badge-info" rel="tooltip" title="Click para informarse">1. Construcción (DEBUG):</span><div style="float:right;" id="msg" hidden="true">Click para ver datos.</div></div>
                                    <span id="Construcción" hidden="true"><br> Este modo de correr de la aplicación es para el momento en el que el programador está desarrollando la aplicación. En este modo la aplicación le muestra al desarrollador los errores generados en la parte servidor, ya sea en el acceso a datos o en la lógica de la programación. No se realiza el registro llamadas al servidor.</span>

                            <div id="Prueba_"><br><br><span id="Prueba_1" rel="tooltip" title="Click para informarse" class="badge badge-success">2.Prueba (TESTING):</span> <div id="msg1" hidden="true">Click para ver datos.</div></div>
                                <span id="Prueba" hidden="true"><br> Este modo de correr de la aplicación es para probar la aplicación teniendo en cuenta la seguridad de la misma, o sea, permitiendo a cada usuario ver y hacer lo que se estableció. (Ver más adelante la administración de la aplicación). Se realiza el registro de llamadas al servidor y se muestra al usuario la descripción completa del error.</span>

                            <div id="Ejecución_"><br><br><span id="Ejecución_1" rel="tooltip" title="Click para informarse" class="badge badge-warning">3. Ejecución (RELEASE):</span><div id="msg2" hidden="true">Click para ver datos.</div></div>
                                <span id="Ejecución" hidden="true"><br> Este es el modo de correr de la aplicación cuando esta está lista. Se realiza el registro de llamadas y errores cuando ocurre un error interno se notifica al usuario un mensaje de error muy general.</span>
                            </p>
                         </div>
                        <div class="alert alert-info" style=" float:right;width:49.5%;min-height:100%;">
                            <h4>Configuración del Usuario de Administración</h4><br>
                            <label>El correo electrónico del administrador *</label><input id="correo_" type="text" placeholder=" arkit@yahoo.es " required="true"><br>
                                   Introduzca una dirección de correo electrónico. Debe ser la dirección de correo electrónico del súper administrador del sitio.<br>
                            <br> <label>Nombre de usuario del administrador * </label><input id="usuario_" type="text" placeholder=" Admin " required="true"><br>
                                   Puede cambiar el nombre de usuario admin que se asigna predeteminadamente.<br>
                            <br> <label>Contraseña del adminsitrador * </label><input id="password" type="password"  placeholder=" ****** " required="true"><br>
                                    Asigne la contraseña de la cuenta del súper administrador y confírmela en el campo de más abajo.<br>
                            <br><label>Confirmar la contraseña del administrador * </label><input id="password_" type="password"  placeholder=" ******" required="true"><br>
                       </div>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
        <div class="tab-pane fade" id="dropdown1">
        <h3>Configuración de la base de datos</h3>
            <div class="alert alert-info">
                <label><b>Hospedaje * </b></label><input type="text" id="Hospedaje_" placeholder=" localhost / 127.0.0.1 " required="true">
                <br>Normalmente es "localhost" o "127.0.0.1"<br>

                <label><b>Puerto * </b></label><input type="text" id="puerto_" placeholder=" 5432 " required="true">
                <br>Normalmente es "5432"<br>

                <br><label><b>Nombre de usuario del Gestor de Base de Datos * </b></label>
                <input type="text" placeholder="root" id="Datos_" required="true"><br>
                Algo como "root" o un nombre de usuario facilitado por quien le sirva el hospedaje.<br>

                <br><label><b>Contraseña del adminsitrador BD del hospedaje.* </b></label><input type="password"  id="BD_pass" placeholder=" ****** " required="true"><br>
                Por cuestiones de seguridad, es primordial usar una contraseña para la cuenta de su base de datos..<br>
                <br><label><b>Base de Datos *</b></label><input type="text"  id="Base_" placeholder="arkit" required="true"><br>

                <p>En algunos hospedajes solo se permite el nombre específico de una base de datos por sitio.
                   En esos casos, si le interesa instalar más de un sitio, puede usar el prefijo de las tablas<br>
                    para distinguir entre los sitios  que usen la misma base de datos.</p>
            <hr>
                <b>Proceso para una base de datos antigua</b>
            <div class="btn-group" data-toggle="buttons-radio">
                <button type="button" class="btn btn-rct" id="respaldo">Respaldar</button>
                <button type="button" class="btn btn-rct" id="borrar">Borrar</button>
            </div>
        </div>
        </div>
        <div class="tab-pane fade" id="dropdown2">
            <div class="alert alert-info" style="float:left; width:29.5%;min-height:90%;">
                <h3>Algo que debe saber.</h3>
            </div>
            <div class="alert alert-info" style=" float:right;width:69.5%;min-height:90%;">
                    <div style="float:right">
                        <button class="btn btn-danger btn-rct" type="button" id="install" data-loading-text="Instalando...">Instalar
                            <i class="icon-circle-arrow-right icon-white"></i></button>
                    </div>
                <h3>Información General de Instalación.</h3>
                <span class="badge badge-success"><h4 style="color:#fff">Resumen:</h4></span>
                <hr>
                <h5>Configuración del sitio.</h5>
                <span class=" label label-info">Nombre del Sitio:</span>&nbsp <b><span id="sitio_nombre"></span></b><br>
                <span class=" label label-info">Descripción del Sitio: </span> &nbsp<b> <span id="desc_nombre"></span></b><br>
                <span class=" label label-info">Modo de inicio: </span> &nbsp <b><span id="modo"></span></b><br>
                <hr>
                <h5>Configuración de administración.</h5>
                <span class=" label label-info">Correo de Administración: </span> <b>&nbsp <span id="Correo"></span></b><br>
                <span class=" label label-info">Usuario: </span> &nbsp <b><span id="Usuario"></span></b><br>
                <hr>
                <h5>Configuración de Base de Datos.</h5>
                <span class=" label label-info">Hospedaje : </span> &nbsp <b><span id="Hospedaje"></span></b><br>
                <span class=" label label-info">Usuario Base de Datos: </span> <b>&nbsp <span id="Datos"></span></b><br>
                <span class=" label label-info">Base de Datos: </span> <b>&nbsp <span id="Base"></span></b><br>
                <span class=" label label-info">Respardar: </span> &nbsp <b><span id="Respardar"></span></b><br>
                <hr>


            </div>


        </div>
    </div>
    <!-------------------------------------------------Tab del sitio----------------------------------------------------->
<footer style="margin-top: 10;">
</footer>
    <div id="alertas"><div>
</div>
</div>
<!-- Modal -->
<div id="licenceModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="myModalLabel">GNU General Public License</h3>
    </div>
    <div class="modal-body">

        <h3>Table of Contents</h3>
        <li>GNU GENERAL PUBLIC LICENSE</li>
        <ul>
            <li>Preamble</li>
            <li>TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION</li>
            <li>How to Apply These Terms to Your New Programs</li>
        </ul>
        <br><b>GNU GENERAL PUBLIC LICENSE</b>
        <br>Version 2, June 1991<br>
        <br>Copyright (C) 1989, 1991 Free Software Foundation, Inc.
        <br>59 Temple Place - Suite 330, Boston, MA  02111-1307, USA<br>
        Everyone is permitted to copy and distribute verbatim copies
        of this license document, but changing it is not allowed.

       <b><br> Preamble</b><br>

       <p> The licenses for most software are designed to take away your freedom to share and change it. By contrast, the GNU General Public License is intended to guarantee your freedom to share and change free software--to make sure the software is free for all its users. This General Public License applies to most of the Free Software Foundation's software and to any other program whose authors commit to using it. (Some other Free Software Foundation software is covered by the GNU Library General Public License instead.) You can apply it to your programs, too.

        </p><p>When we speak of free software, we are referring to freedom, not price. Our General Public Licenses are designed to make sure that you have the freedom to distribute copies of free software (and charge for this service if you wish), that you receive source code or can get it if you want it, that you can change the software or use pieces of it in new free programs; and that you know you can do these things.

        </p><p>To protect your rights, we need to make restrictions that forbid anyone to deny you these rights or to ask you to surrender the rights. These restrictions translate to certain responsibilities for you if you distribute copies of the software, or if you modify it.

    </p><p>For example, if you distribute copies of such a program, whether gratis or for a fee, you must give the recipients all the rights that you have. You must make sure that they, too, receive or can get the source code. And you must show them these terms so they know their rights.

    </p><p>We protect your rights with two steps: (1) copyright the software, and (2) offer you this license which gives you legal permission to copy, distribute and/or modify the software.

    </p><p>Also, for each author's protection and ours, we want to make certain that everyone understands that there is no warranty for this free software. If the software is modified by someone else and passed on, we want its recipients to know that what they have is not the original, so that any problems introduced by others will not reflect on the original authors' reputations.

    </p><p> Finally, any free program is threatened constantly by software patents. We wish to avoid the danger that redistributors of a free program will individually obtain patent licenses, in effect making the program proprietary. To prevent this, we have made it clear that any patent must be licensed for everyone's free use or not licensed at all.

    </p><p>  The precise terms and conditions for copying, distribution and modification follow.

    </p><p><b> TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION</b>

    </p><p> 0. This License applies to any program or other work which contains a notice placed by the copyright holder saying it may be distributed under the terms of this General Public License. The "Program", below, refers to any such program or work, and a "work based on the Program" means either the Program or any derivative work under copyright law: that is to say, a work containing the Program or a portion of it, either verbatim or with modifications and/or translated into another language. (Hereinafter, translation is included without limitation in the term "modification".) Each licensee is addressed as "you".

    </p><p> Activities other than copying, distribution and modification are not covered by this License; they are outside its scope. The act of running the Program is not restricted, and the output from the Program is covered only if its contents constitute a work based on the Program (independent of having been made by running the Program). Whether that is true depends on what the Program does.

    </p><p>  1. You may copy and distribute verbatim copies of the Program's source code as you receive it, in any medium, provided that you conspicuously and appropriately publish on each copy an appropriate copyright notice and disclaimer of warranty; keep intact all the notices that refer to this License and to the absence of any warranty; and give any other recipients of the Program a copy of this License along with the Program.

    </p><p>   You may charge a fee for the physical act of transferring a copy, and you may at your option offer warranty protection in exchange for a fee.

    </p><p>   2. You may modify your copy or copies of the Program or any portion of it, thus forming a work based on the Program, and copy and distribute such modifications or work under the terms of Section 1 above, provided that you also meet all of these conditions:

    </p><p>  a) You must cause the modified files to carry prominent notices stating that you changed the files and the date of any change.
    </p><p> b) You must cause any work that you distribute or publish, that in whole or in part contains or is derived from the Program or any part thereof, to be licensed as a whole at no charge to all third parties under the terms of this License.
    </p><p>  c) If the modified program normally reads commands interactively when run, you must cause it, when started running for such interactive use in the most ordinary way, to print or display an announcement including an appropriate copyright notice and a notice that there is no warranty (or else, saying that you provide a warranty) and that users may redistribute the program under these conditions, and telling the user how to view a copy of this License. (Exception: if the Program itself is interactive but does not normally print such an announcement, your work based on the Program is not required to print an announcement.)
    </p><p>   These requirements apply to the modified work as a whole. If identifiable sections of that work are not derived from the Program, and can be reasonably considered independent and separate works in themselves, then this License, and its terms, do not apply to those sections when you distribute them as separate works. But when you distribute the same sections as part of a whole which is a work based on the Program, the distribution of the whole must be on the terms of this License, whose permissions for other licensees extend to the entire whole, and thus to each and every part regardless of who wrote it.
    </p><p>   Thus, it is not the intent of this section to claim rights or contest your rights to work written entirely by you; rather, the intent is to exercise the right to control the distribution of derivative or collective works based on the Program.

    </p><p>   In addition, mere aggregation of another work not based on the Program with the Program (or with a work based on the Program) on a volume of a storage or distribution medium does not bring the other work under the scope of this License.

    </p><p>   3. You may copy and distribute the Program (or a work based on it, under Section 2) in object code or executable form under the terms of Sections 1 and 2 above provided that you also do one of the following:

    </p><p>   a) Accompany it with the complete corresponding machine-readable source code, which must be distributed under the terms of Sections 1 and 2 above on a medium customarily used for software interchange; or,
    </p><p>   b) Accompany it with a written offer, valid for at least three years, to give any third party, for a charge no more than your cost of physically performing source distribution, a complete machine-readable copy of the corresponding source code, to be distributed under the terms of Sections 1 and 2 above on a medium customarily used for software interchange; or,
    </p><p>   c) Accompany it with the information you received as to the offer to distribute corresponding source code. (This alternative is allowed only for noncommercial distribution and only if you received the program in object code or executable form with such an offer, in accord with Subsection b above.)
    </p><p>   The source code for a work means the preferred form of the work for making modifications to it. For an executable work, complete source code means all the source code for all modules it contains, plus any associated interface definition files, plus the scripts used to control compilation and installation of the executable. However, as a special exception, the source code distributed need not include anything that is normally distributed (in either source or binary form) with the major components (compiler, kernel, and so on) of the operating system on which the executable runs, unless that component itself accompanies the executable.
    </p><p>   If distribution of executable or object code is made by offering access to copy from a designated place, then offering equivalent access to copy the source code from the same place counts as distribution of the source code, even though third parties are not compelled to copy the source along with the object code.

    </p><p>   4. You may not copy, modify, sublicense, or distribute the Program except as expressly provided under this License. Any attempt otherwise to copy, modify, sublicense or distribute the Program is void, and will automatically terminate your rights under this License. However, parties who have received copies, or rights, from you under this License will not have their licenses terminated so long as such parties remain in full compliance.

    </p><p>  5. You are not required to accept this License, since you have not signed it. However, nothing else grants you permission to modify or distribute the Program or its derivative works. These actions are prohibited by law if you do not accept this License. Therefore, by modifying or distributing the Program (or any work based on the Program), you indicate your acceptance of this License to do so, and all its terms and conditions for copying, distributing or modifying the Program or works based on it.

    </p><p>  6. Each time you redistribute the Program (or any work based on the Program), the recipient automatically receives a license from the original licensor to copy, distribute or modify the Program subject to these terms and conditions. You may not impose any further restrictions on the recipients' exercise of the rights granted herein. You are not responsible for enforcing compliance by third parties to this License.

    </p><p>   7. If, as a consequence of a court judgment or allegation of patent infringement or for any other reason (not limited to patent issues), conditions are imposed on you (whether by court order, agreement or otherwise) that contradict the conditions of this License, they do not excuse you from the conditions of this License. If you cannot distribute so as to satisfy simultaneously your obligations under this License and any other pertinent obligations, then as a consequence you may not distribute the Program at all. For example, if a patent license would not permit royalty-free redistribution of the Program by all those who receive copies directly or indirectly through you, then the only way you could satisfy both it and this License would be to refrain entirely from distribution of the Program.

    </p><p>   If any portion of this section is held invalid or unenforceable under any particular circumstance, the balance of the section is intended to apply and the section as a whole is intended to apply in other circumstances.

    </p><p>   It is not the purpose of this section to induce you to infringe any patents or other property right claims or to contest validity of any such claims; this section has the sole purpose of protecting the integrity of the free software distribution system, which is implemented by public license practices. Many people have made generous contributions to the wide range of software distributed through that system in reliance on consistent application of that system; it is up to the author/donor to decide if he or she is willing to distribute software through any other system and a licensee cannot impose that choice.

    </p><p>   This section is intended to make thoroughly clear what is believed to be a consequence of the rest of this License.

    </p><p>   8. If the distribution and/or use of the Program is restricted in certain countries either by patents or by copyrighted interfaces, the original copyright holder who places the Program under this License may add an explicit geographical distribution limitation excluding those countries, so that distribution is permitted only in or among countries not thus excluded. In such case, this License incorporates the limitation as if written in the body of this License.

    </p><p>   9. The Free Software Foundation may publish revised and/or new versions of the General Public License from time to time. Such new versions will be similar in spirit to the present version, but may differ in detail to address new problems or concerns.

    </p><p>  Each version is given a distinguishing version number. If the Program specifies a version number of this License which applies to it and "any later version", you have the option of following the terms and conditions either of that version or of any later version published by the Free Software Foundation. If the Program does not specify a version number of this License, you may choose any version ever published by the Free Software Foundation.

    </p><p>   10. If you wish to incorporate parts of the Program into other free programs whose distribution conditions are different, write to the author to ask for permission. For software which is copyrighted by the Free Software Foundation, write to the Free Software Foundation; we sometimes make exceptions for this. Our decision will be guided by the two goals of preserving the free status of all derivatives of our free software and of promoting the sharing and reuse of software generally.

    </p><p>  NO WARRANTY

    </p><p>  11. BECAUSE THE PROGRAM IS LICENSED FREE OF CHARGE, THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

    </p><p>  12. IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY MODIFY AND/OR REDISTRIBUTE THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

    </p><p>  END OF TERMS AND CONDITIONS

    </p><p><b>  How to Apply These Terms to Your New Programs</b>

    </p><p> If you develop a new program, and you want it to be of the greatest possible use to the public, the best way to achieve this is to make it free software which everyone can redistribute and change under these terms.

    </p><p>  To do so, attach the following notices to the program. It is safest to attach them to the start of each source file to most effectively convey the exclusion of warranty; and each file should have at least the "copyright" line and a pointer to where the full notice is found.

    </p><p>  one line to give the program's name and an idea of what it does.
    </p><p>  Copyright (C) yyyy  name of author

    </p><p>  This program is free software; you can redistribute it and/or
        modify it under the terms of the GNU General Public License
        as published by the Free Software Foundation; either version 2
        of the License, or (at your option) any later version.

    </p><p>   This program is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU General Public License for more details.

    </p><p>   You should have received a copy of the GNU General Public License
        along with this program; if not, write to the Free Software
        Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA
        02111-1307, USA.
        Also add information on how to contact you by electronic and paper mail.

    </p><p>   If the program is interactive, make it output a short notice like this when it starts in an interactive mode:

    </p><p>   Gnomovision version 69, Copyright (C) year name of author
        Gnomovision comes with ABSOLUTELY NO WARRANTY; for details
        type `show w'.  This is free software, and you are welcome
        to redistribute it under certain conditions; type `show c'
        for details.
        The hypothetical commands `show w' and `show c' should show the appropriate parts of the General Public License. Of course, the commands you use may be called something other than `show w' and `show c'; they could even be mouse-clicks or menu items--whatever suits your program.

    </p><p>  You should also get your employer (if you work as a programmer) or your school, if any, to sign a "copyright disclaimer" for the program, if necessary. Here is a sample; alter the names:

        Yoyodyne, Inc., hereby disclaims all copyright
        interest in the program `Gnomovision'
        (which makes passes at compilers) written
        by James Hacker.

    </p><p>   signature of Ty Coon, 1 April 1989
        Ty Coon, President of Vice
        This General Public License does not permit incorporating your program into proprietary programs. If your program is a subroutine library, you may consider it more useful to permit linking proprietary applications with the library. If this is what you want to do, use the GNU Lesser General Public License instead of this License.
    </p>

    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
    </div>
</div>
<!-- Modal -->
</body>
</html> 