import { Modal } from 'antd';

interface TechSpecsModalProps {
    open: boolean;
    onClose: () => void;
    os: 'linux' | 'windows';
}

export const TechSpecsModal = ({ open, onClose, os }: TechSpecsModalProps) => (
    <Modal
        title="Technical Specifications"
        open={open}
        onCancel={onClose}
        width="90%"
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
        footer={null}
    >
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#F9FAFB' }}>
                        <th style={{ border: '1px solid #E5E7EB', padding: '16px', textAlign: 'left', fontWeight: 600, width: '25%' }}>Core Software</th>
                        <th style={{ border: '1px solid #E5E7EB', padding: '16px', textAlign: 'left', fontWeight: 600, width: '25%' }}>Database</th>
                        <th style={{ border: '1px solid #E5E7EB', padding: '16px', textAlign: 'left', fontWeight: 600, width: '25%' }}>Additional Supported Software</th>
                        <th style={{ border: '1px solid #E5E7EB', padding: '16px', textAlign: 'left', fontWeight: 600, width: '25%' }}>Security</th>
                    </tr>
                </thead>
                <tbody>
                    {os === 'linux' ? (
                        <tr>
                            <td style={{ border: '1px solid #E5E7EB', padding: '16px', verticalAlign: 'top' }}>
                                <div style={{ lineHeight: '2' }}>CentOS 7.x*</div>
                                <div style={{ lineHeight: '2' }}>Apache 2.4</div>
                                <div style={{ lineHeight: '2' }}>cPanel 110</div>
                                <div style={{ lineHeight: '2' }}>PHP 8.3, 8.2 & 8.1</div>
                                <div style={{ lineHeight: '2' }}>MySQL version (server) 5.7</div>
                                <div style={{ lineHeight: '2' }}>MySQL client Yes</div>
                                <div style={{ lineHeight: '2' }}>Python 2.7 and 3.6</div>
                                <div style={{ lineHeight: '2' }}>PEAR Supported</div>
                                <div style={{ lineHeight: '2' }}>phpMyAdmin 5.2.1</div>
                                <div style={{ lineHeight: '2' }}>CloudFlare Supported</div>
                                <div style={{ lineHeight: '2' }}>Softaculous Supported</div>
                                <div style={{ lineHeight: '2' }}>ionCube Loader Supported</div>
                                <div style={{ lineHeight: '2' }}>PDO_MySQL Supported</div>
                                <div style={{ lineHeight: '2' }}>Perl Supported</div>
                                <div style={{ lineHeight: '2' }}>PHP Safe Mode Supported</div>
                                <div style={{ lineHeight: '2' }}>mcrypt Supported</div>
                                <div style={{ lineHeight: '2' }}>Zend Engine Supported</div>
                                <div style={{ lineHeight: '2' }}>eAccelerator Supported</div>
                                <div style={{ lineHeight: '2' }}>Ruby Supported</div>
                                <div style={{ lineHeight: '2' }}>zlib Supported</div>
                                <div style={{ lineHeight: '2' }}>cURL Supported</div>
                                <div style={{ lineHeight: '2' }}>cURL Library Functions Supported</div>
                                <div style={{ lineHeight: '2' }}>ImageMagick Supported</div>
                            </td>
                            <td style={{ border: '1px solid #E5E7EB', padding: '16px', verticalAlign: 'top' }}>
                                <div style={{ lineHeight: '2' }}>MySQL version (server) 5.7</div>
                                <div style={{ lineHeight: '2' }}>MySQL client Yes</div>
                                <div style={{ lineHeight: '2' }}>phpMyAdmin 5.2.1</div>
                                <div style={{ lineHeight: '2' }}>Toad for MySQL Supported</div>
                                <div style={{ lineHeight: '2' }}>MYSQL: MyISAM Supported</div>
                                <div style={{ lineHeight: '2' }}>formmail.cgi Supported</div>
                                <div style={{ lineHeight: '2' }}>SFTP Supported</div>
                                <div style={{ lineHeight: '2' }}>MySQL Admin tools Supported</div>
                            </td>
                            <td style={{ border: '1px solid #E5E7EB', padding: '16px', verticalAlign: 'top' }}>
                                <div style={{ lineHeight: '2' }}>Zend Optimizer Supported</div>
                                <div style={{ lineHeight: '2' }}>Zend Guard Loader Supported</div>
                                <div style={{ lineHeight: '2' }}>mod_mime.c Supported</div>
                                <div style={{ lineHeight: '2' }}>jQuery Supported</div>
                                <div style={{ lineHeight: '2' }}>InnooDB Supported</div>
                                <div style={{ lineHeight: '2' }}>SSI Supported</div>
                                <div style={{ lineHeight: '2' }}>mod_rewrite / URL rewrite Supported</div>
                                <div style={{ lineHeight: '2' }}>Ruby On Rails Supported</div>
                                <div style={{ lineHeight: '2' }}>Javascripts (only if embedded in HTML) Supported</div>
                                <div style={{ lineHeight: '2' }}>soap module Supported</div>
                                <div style={{ lineHeight: '2' }}>json Supported</div>
                            </td>
                            <td style={{ border: '1px solid #E5E7EB', padding: '16px', verticalAlign: 'top' }}>
                                <div style={{ lineHeight: '2' }}>Password protected folders Supported</div>
                                <div style={{ lineHeight: '2' }}>Hotlink Protection Supported</div>
                                <div style={{ lineHeight: '2' }}>Leech Protection Supported</div>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td style={{ border: '1px solid #E5E7EB', padding: '16px', verticalAlign: 'top' }}>
                                <div style={{ lineHeight: '2' }}>Windows 2022 (Standard) 64 bit</div>
                                <div style={{ lineHeight: '2' }}>Plesk Obsidian 18.x</div>
                                <div style={{ lineHeight: '2' }}>Microsoft-IIS 10</div>
                                <div style={{ lineHeight: '2' }}>PHP 7.4, 8.0, 8.1, 8.2 and above</div>
                                <div style={{ lineHeight: '2' }}>ASP Supported</div>
                                <div style={{ lineHeight: '2' }}>ASP.NET 3.5, ASP.NET 4.8</div>
                                <div style={{ lineHeight: '2' }}>.NET Framework 1.x /2.x /3.x /6.x /7.x</div>
                                <div style={{ lineHeight: '2' }}>ASP.NET MVC 5 Supported</div>
                                <div style={{ lineHeight: '2' }}>Perl 5.10.1</div>
                                <div style={{ lineHeight: '2' }}>Python 2.6 5.12</div>
                                <div style={{ lineHeight: '2' }}>URL Rewrite Supported</div>
                                <div style={{ lineHeight: '2' }}>json Supported</div>
                            </td>
                            <td style={{ border: '1px solid #E5E7EB', padding: '16px', verticalAlign: 'top' }}>
                                <div style={{ lineHeight: '2' }}>Microsoft SQL Server 2016 and 2017</div>
                                <div style={{ lineHeight: '2' }}>myLittleAdmin 3.8</div>
                                <div style={{ lineHeight: '2' }}>MySQL 8 and above</div>
                                <div style={{ lineHeight: '2' }}>phpMyAdmin 5</div>
                                <div style={{ lineHeight: '2' }}>Crystal Report Available</div>
                                <div style={{ lineHeight: '2' }}>Zend Engine Available</div>
                                <div style={{ lineHeight: '2' }}>ASP mail scripts Available</div>
                                <div style={{ lineHeight: '2' }}>PHP mail scripts Available</div>
                            </td>
                            <td style={{ border: '1px solid #E5E7EB', padding: '16px', verticalAlign: 'top' }}>
                                <div style={{ lineHeight: '2' }}>SilverLight Available</div>
                                <div style={{ lineHeight: '2' }}>Zend Guard Loader Available</div>
                                <div style={{ lineHeight: '2' }}>ionCube Loader Available</div>
                                <div style={{ lineHeight: '2' }}>jQuery Available</div>
                                <div style={{ lineHeight: '2' }}>Ajax Available</div>
                                <div style={{ lineHeight: '2' }}>WCF Service Available</div>
                                <div style={{ lineHeight: '2' }}>Windows Presentation Foundation or WPF Available</div>
                                <div style={{ lineHeight: '2' }}>Language Integrated Query or LinQ Available</div>
                            </td>
                            <td style={{ border: '1px solid #E5E7EB', padding: '16px', verticalAlign: 'top' }}>
                                <div style={{ lineHeight: '2' }}>Password Protected folders Supported</div>
                                <div style={{ lineHeight: '2' }}>Hotlink Protection Supported</div>
                                <div style={{ lineHeight: '2' }}>MSSQL SQL Server Supported</div>
                                <div style={{ lineHeight: '2' }}>MySQL 8 and above</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </Modal>
);
