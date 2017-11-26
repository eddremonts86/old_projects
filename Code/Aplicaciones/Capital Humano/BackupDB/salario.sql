--
-- PostgreSQL database dump
--

-- Dumped from database version 9.2.4
-- Dumped by pg_dump version 9.2.4
-- Started on 2014-08-10 21:44:24

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 8 (class 2615 OID 57961)
-- Name: system; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA system;


ALTER SCHEMA system OWNER TO postgres;

--
-- TOC entry 9 (class 2615 OID 57962)
-- Name: utiles; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA utiles;


ALTER SCHEMA utiles OWNER TO postgres;

SET search_path = utiles, pg_catalog;

--
-- TOC entry 220 (class 1255 OID 57967)
-- Name: fn_get_id(); Type: FUNCTION; Schema: utiles; Owner: postgres
--

CREATE FUNCTION fn_get_id() RETURNS character varying
    LANGUAGE plpgsql COST 10
    AS $$       
	DECLARE
		id integer default nextval('utiles.seq_ids'::regclass);
		sigla character varying;
		
	BEGIN

		sigla = (select siglas from utiles.configuracion limit 1)||'-ACC-'||id;

		return sigla;
	


		
	END;
  $$;


ALTER FUNCTION utiles.fn_get_id() OWNER TO postgres;

--
-- TOC entry 2083 (class 0 OID 0)
-- Dependencies: 220
-- Name: FUNCTION fn_get_id(); Type: COMMENT; Schema: utiles; Owner: postgres
--

COMMENT ON FUNCTION fn_get_id() IS 'Devuelve el ID';


--
-- TOC entry 221 (class 1255 OID 57968)
-- Name: fn_update_data_user(character varying, character varying, character varying, integer); Type: FUNCTION; Schema: utiles; Owner: postgres
--

CREATE FUNCTION fn_update_data_user(character varying, character varying, character varying, integer) RETURNS character varying
    LANGUAGE plpgsql COST 10
    AS $_$       
--recibe usuario, cargo, email
	BEGIN

		UPDATE app_security.users  SET cargo=$2, email=$3, dias=$4 WHERE user_id=$1;

		return 1;
		
	END;
  $_$;


ALTER FUNCTION utiles.fn_update_data_user(character varying, character varying, character varying, integer) OWNER TO postgres;

--
-- TOC entry 2085 (class 0 OID 0)
-- Dependencies: 221
-- Name: FUNCTION fn_update_data_user(character varying, character varying, character varying, integer); Type: COMMENT; Schema: utiles; Owner: postgres
--

COMMENT ON FUNCTION fn_update_data_user(character varying, character varying, character varying, integer) IS 'configura los dtaos del usuario';


--
-- TOC entry 222 (class 1255 OID 57969)
-- Name: fn_update_date_action(character varying, character varying[], character varying[]); Type: FUNCTION; Schema: utiles; Owner: postgres
--

CREATE FUNCTION fn_update_date_action(character varying, character varying[], character varying[]) RETURNS character varying
    LANGUAGE plpgsql COST 10
    AS $_$       
--recibe usuario, el listado organos, lista dias
	DECLARE 	
		i integer;
	BEGIN

		FOR i IN array_lower($2,1) .. array_upper($2,1) LOOP 
	
			UPDATE utiles.user_organo
				   SET dias=$3[i]::integer
			WHERE users=$1 AND organo=$2[i]; 

	 END LOOP; 

return 1;
		
	END;
  $_$;


ALTER FUNCTION utiles.fn_update_date_action(character varying, character varying[], character varying[]) OWNER TO postgres;

--
-- TOC entry 2087 (class 0 OID 0)
-- Dependencies: 222
-- Name: FUNCTION fn_update_date_action(character varying, character varying[], character varying[]); Type: COMMENT; Schema: utiles; Owner: postgres
--

COMMENT ON FUNCTION fn_update_date_action(character varying, character varying[], character varying[]) IS 'configura la cantidad de dias por acciones';


--
-- TOC entry 223 (class 1255 OID 57970)
-- Name: fn_update_user_action(character varying, character varying[], character varying[]); Type: FUNCTION; Schema: utiles; Owner: postgres
--

CREATE FUNCTION fn_update_user_action(character varying, character varying[], character varying[]) RETURNS character varying
    LANGUAGE plpgsql COST 10
    AS $_$       
--recibe usuario, organos, sube
	DECLARE 	
		i integer;
	BEGIN

		IF($2[1] IS NULL OR $2[1] = '')THEN

			DELETE FROM utiles.user_organo WHERE users = $1;
		ELSE
			FOR i IN array_lower($2,1) .. array_upper($2,1) LOOP 

				IF((select count(*) from utiles.user_organo where users=$1 and organo=$2[i]) = 0)THEN

					INSERT INTO utiles.user_organo(users, organo, sube)
						VALUES ($1, $2[i], $3[i]::boolean);
				ELSE
					UPDATE utiles.user_organo
						   SET SUBE=$3[i]::BOOLEAN
					WHERE users=$1 AND organo=$2[i]; 
				END IF;

			END LOOP; 
		END IF;

		return 1;
		
	END;
  $_$;


ALTER FUNCTION utiles.fn_update_user_action(character varying, character varying[], character varying[]) OWNER TO postgres;

--
-- TOC entry 2089 (class 0 OID 0)
-- Dependencies: 223
-- Name: FUNCTION fn_update_user_action(character varying, character varying[], character varying[]); Type: COMMENT; Schema: utiles; Owner: postgres
--

COMMENT ON FUNCTION fn_update_user_action(character varying, character varying[], character varying[]) IS 'configura la cantidad de dias por acciones';


SET search_path = system, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 194 (class 1259 OID 58103)
-- Name: pronostico; Type: TABLE; Schema: system; Owner: postgres; Tablespace: 
--

CREATE TABLE pronostico (
    id character varying DEFAULT clone.get_id() NOT NULL,
    id_agencia character varying,
    anno character varying,
    mes character varying,
    pb numeric,
    va character varying,
    sva character varying,
    porc character varying,
    porcientoc numeric,
    total_inc numeric,
    reale numeric,
    pp1_inc numeric,
    pp2 numeric,
    gm numeric,
    sc numeric,
    nombre character varying,
    comb numeric,
    elec numeric,
    fc numeric,
    matr numeric,
    productiva boolean
);


ALTER TABLE system.pronostico OWNER TO postgres;

--
-- TOC entry 195 (class 1259 OID 58110)
-- Name: pronostico_view; Type: VIEW; Schema: system; Owner: postgres
--

CREATE VIEW pronostico_view AS
    SELECT pronostico.id_agencia AS id, pronostico.anno, pronostico.mes, pronostico.pb, pronostico.va, pronostico.sva, pronostico.porc, pronostico.porcientoc, pronostico.total_inc, pronostico.reale, pronostico.pp1_inc, pronostico.pp2, pronostico.gm, pronostico.sc, pronostico.nombre, pronostico.comb, pronostico.elec, pronostico.fc, pronostico.matr, pronostico.productiva FROM pronostico;


ALTER TABLE system.pronostico_view OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 58114)
-- Name: seguridad; Type: TABLE; Schema: system; Owner: postgres; Tablespace: 
--

CREATE TABLE seguridad (
    id character varying DEFAULT clone.get_id() NOT NULL,
    id_traba character varying,
    id_agen character varying,
    nombre character varying,
    activo boolean DEFAULT true
);


ALTER TABLE system.seguridad OWNER TO postgres;

SET search_path = utiles, pg_catalog;

--
-- TOC entry 197 (class 1259 OID 58122)
-- Name: configuracion; Type: TABLE; Schema: utiles; Owner: postgres; Tablespace: 
--

CREATE TABLE configuracion (
    siglas text NOT NULL,
    unidad text
);


ALTER TABLE utiles.configuracion OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 58128)
-- Name: seq_ids; Type: SEQUENCE; Schema: utiles; Owner: postgres
--

CREATE SEQUENCE seq_ids
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE utiles.seq_ids OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 58130)
-- Name: update_time; Type: TABLE; Schema: utiles; Owner: postgres; Tablespace: 
--

CREATE TABLE update_time (
    id character varying DEFAULT clone.get_id() NOT NULL,
    update_mes boolean DEFAULT false
);


ALTER TABLE utiles.update_time OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 58138)
-- Name: user_actions; Type: TABLE; Schema: utiles; Owner: postgres; Tablespace: 
--

CREATE TABLE user_actions (
    actions character varying DEFAULT fn_get_id() NOT NULL,
    users character varying,
    name_actions character varying,
    fecha date
);


ALTER TABLE utiles.user_actions OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 58145)
-- Name: user_organo; Type: TABLE; Schema: utiles; Owner: postgres; Tablespace: 
--

CREATE TABLE user_organo (
    users text NOT NULL,
    organo text NOT NULL,
    sube boolean DEFAULT false
);


ALTER TABLE utiles.user_organo OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 58152)
-- Name: users; Type: TABLE; Schema: utiles; Owner: postgres; Tablespace: 
--

CREATE TABLE users (
    id character varying NOT NULL,
    name character varying,
    cargo character varying,
    email character varying,
    activo boolean DEFAULT true,
    dias integer DEFAULT 10
);


ALTER TABLE utiles.users OWNER TO postgres;

SET search_path = system, pg_catalog;

--
-- TOC entry 2071 (class 0 OID 58103)
-- Dependencies: 194
-- Data for Name: pronostico; Type: TABLE DATA; Schema: system; Owner: postgres
--

INSERT INTO pronostico (id, id_agencia, anno, mes, pb, va, sva, porc, porcientoc, total_inc, reale, pp1_inc, pp2, gm, sc, nombre, comb, elec, fc, matr, productiva) VALUES ('DE_vag_14622', 'DE-AG-4', '2014', '1', 284356, '274814', '3.203781855487421', '85778', 83.70668072209777, 303560, 254100, 22880, 7858, 9090, 452, 'AGENCIA PINAR DEL RIO', 4525, 4524, 85778, 41, true);
INSERT INTO pronostico (id, id_agencia, anno, mes, pb, va, sva, porc, porcientoc, total_inc, reale, pp1_inc, pp2, gm, sc, nombre, comb, elec, fc, matr, productiva) VALUES ('DE_vag_14621', 'DE-AG-3', '2014', '5', 0, '0', 'NaN', '0', 'NaN', 0, 0, 0, 0, 0, 0, 'DIRECCION DE EMPRESA', 0, 0, 0, 0, true);
INSERT INTO pronostico (id, id_agencia, anno, mes, pb, va, sva, porc, porcientoc, total_inc, reale, pp1_inc, pp2, gm, sc, nombre, comb, elec, fc, matr, productiva) VALUES ('DE_vag_14620', 'DE-AG-2', '2014', '1', 74254, '73629', '2.262444690265487', '32544', 131.48542999289268, 56280, 74000, 2840, 254, 478, 147, 'AGENCIA INVESTIGACION Y DESARROLLO', 154, 124, 32544, 200, true);
INSERT INTO pronostico (id, id_agencia, anno, mes, pb, va, sva, porc, porcientoc, total_inc, reale, pp1_inc, pp2, gm, sc, nombre, comb, elec, fc, matr, productiva) VALUES ('DE_vag_14642', 'de_sconpte2.0.1_296997', '2014', '2', -119080, '-119080', '0', '0', 0, 115610, 0, 90890, 0, 0, 0, 'AGENCIA CONSOLACIÓN DEL SUR', 0, 0, 0, 0, true);


--
-- TOC entry 2072 (class 0 OID 58114)
-- Dependencies: 196
-- Data for Name: seguridad; Type: TABLE DATA; Schema: system; Owner: postgres
--

INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14643', 'Usr-0001', 'syst_All', 'EMPRESA', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14645', 'DE-Usr-2553', 'syst_All', 'EMPRESA', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14666', 'DE-Usr-2615', 'DE-AG-3', 'DIRECCION DE EMPRESA', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14667', 'DE-Usr-2653', 'DE-AG-3', 'DIRECCION DE EMPRESA', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14668', 'DE-Usr-2571', 'DE-AG-1', 'UNIDAD BÁSICA UBL', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14669', 'DE-Usr-2571', 'DE-AG-2', 'AGENCIA INVESTIGACION Y DESARROLLO', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14670', 'DE-Usr-2571', 'DE-AG-3', 'DIRECCION DE EMPRESA', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14671', 'DE-Usr-2571', 'DE-AG-4', 'AGENCIA PINAR DEL RIO', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14672', 'DE-Usr-2571', 'DE-AG-5', 'AGENCIA GRÁFICA', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14673', 'DE-Usr-2571', 'DE-AG-6', 'AGENCIA ANAV', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14674', 'DE-Usr-2571', 'de_sconpte2.0.1_296997', 'AGENCIA CONSOLACIÓN DEL SUR', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14675', 'DE-Usr-2571', 'syst_All', 'EMPRESA', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14676', 'DE-Usr-2571', 'DE-AG-1', 'UNIDAD BÁSICA UBL', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14677', 'DE-Usr-2571', 'DE-AG-2', 'AGENCIA INVESTIGACION Y DESARROLLO', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14678', 'DE-Usr-2571', 'DE-AG-3', 'DIRECCION DE EMPRESA', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14679', 'DE-Usr-2571', 'DE-AG-4', 'AGENCIA PINAR DEL RIO', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14680', 'DE-Usr-2571', 'DE-AG-5', 'AGENCIA GRÁFICA', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14681', 'DE-Usr-2571', 'DE-AG-6', 'AGENCIA ANAV', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14682', 'DE-Usr-2571', 'de_sconpte2.0.1_296997', 'AGENCIA CONSOLACIÓN DEL SUR', true);
INSERT INTO seguridad (id, id_traba, id_agen, nombre, activo) VALUES ('DE_vag_14683', 'DE-Usr-2571', 'syst_All', 'EMPRESA', true);


SET search_path = utiles, pg_catalog;

--
-- TOC entry 2073 (class 0 OID 58122)
-- Dependencies: 197
-- Data for Name: configuracion; Type: TABLE DATA; Schema: utiles; Owner: postgres
--

INSERT INTO configuracion (siglas, unidad) VALUES ('DE', 'Dirección Empresa');


--
-- TOC entry 2091 (class 0 OID 0)
-- Dependencies: 198
-- Name: seq_ids; Type: SEQUENCE SET; Schema: utiles; Owner: postgres
--

SELECT pg_catalog.setval('seq_ids', 977, true);


--
-- TOC entry 2075 (class 0 OID 58130)
-- Dependencies: 199
-- Data for Name: update_time; Type: TABLE DATA; Schema: utiles; Owner: postgres
--

INSERT INTO update_time (id, update_mes) VALUES ('DE_capital_humano_1219', true);


--
-- TOC entry 2076 (class 0 OID 58138)
-- Dependencies: 200
-- Data for Name: user_actions; Type: TABLE DATA; Schema: utiles; Owner: postgres
--

INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-37', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre pepe', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-39', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre pepe', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-41', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre pepe', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-43', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre pepe', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-45', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre pepe', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-47', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre pepe', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-48', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre pepe', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-49', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre pepe', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-50', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre pepe', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-51', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre pepe', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-52', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre pepe', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-53', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre pepe', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-55', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre pip', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-57', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre t', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-59', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-61', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre eew', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-62', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre tuuu', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-63', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre tuuutryty', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-64', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre as', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-65', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre pepe', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-66', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre pepe', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-67', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre eew', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-68', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-69', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-70', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-71', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-72', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-73', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-74', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-75', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-76', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-77', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-78', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-79', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-80', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-81', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-82', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-83', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-84', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-85', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-86', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-87', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-88', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-89', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-90', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-91', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-92', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-93', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre id', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-94', 'DE-US-1', 'Eliminó el nomenclador Órgano', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-95', 'DE-US-1', 'Eliminó el nomenclador Órgano', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-96', 'DE-US-1', 'Eliminó el nomenclador Órgano', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-97', 'DE-US-1', 'Eliminó el nomenclador Órgano', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-98', 'DE-US-1', 'Eliminó el nomenclador Órgano', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-99', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre i', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-100', 'DE-US-1', 'Eliminó el nomenclador Órgano', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-102', 'DE-US-1', 'Insertó el nomenclador Cargo con el nombre pep', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-104', 'DE-US-1', 'Insertó el nomenclador Cargo con el nombre qwqw', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-106', 'DE-US-1', 'Insertó el nomenclador Cargo con el nombre q', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-107', 'DE-US-1', 'Modificó el nomenclador Cargo con el nombre q4', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-108', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre pip', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-109', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre pip', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-110', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre pip', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-111', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre pip', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-112', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre pip', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-113', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre pip', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-114', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre pip', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-115', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre pip', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-116', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre pip', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-117', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre pip', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-118', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre pip', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-119', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre pipf', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-120', 'DE-US-1', 'Eliminó el nomenclador Órgano', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-121', 'DE-US-1', 'Modificó el nomenclador Cargo con el nombre q4', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-122', 'DE-US-1', 'Modificó el nomenclador Cargo con el nombre pep', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-123', 'DE-US-1', 'Modificó el nomenclador Cargo con el nombre q44444', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-124', 'DE-US-1', 'Eliminó el nomenclador Cargo', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-125', 'DE-US-1', 'Eliminó el nomenclador Cargo', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-126', 'DE-US-1', 'Eliminó el nomenclador Cargo', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-128', 'DE-US-1', 'Insertó el nomenclador Cargo con el nombre ', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-130', 'DE-US-1', 'Insertó el nomenclador Cargo con el nombre elena', '2013-07-19');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-132', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre 2323', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-133', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre 2323', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-134', 'DE-US-1', 'Eliminó el nomenclador Órgano', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-135', 'DE-US-1', 'Insertó el nomenclador Cargo con el nombre pep', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-137', 'DE-US-1', 'Insertó el nomenclador Cargo con el nombre carlos', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-138', 'DE-US-1', 'Eliminó el nomenclador Cargo', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-139', 'DE-US-1', 'Eliminó el nomenclador Cargo', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-140', 'DE-US-1', 'Insertó el nomenclador Cargo con el nombre elena', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-141', 'DE-US-1', 'Eliminó el nomenclador Cargo', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-142', 'DE-US-1', 'Insertó el nomenclador Cargo con el nombre elena', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-143', 'DE-US-1', 'Eliminó el nomenclador Cargo', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-144', 'DE-US-1', 'Insertó el nomenclador Cargo con el nombre elena', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-145', 'DE-US-1', 'Eliminó el nomenclador Cargo', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-146', 'DE-US-1', 'Insertó el nomenclador Cargo con el nombre elena', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-147', 'DE-US-1', 'Eliminó el nomenclador Cargo', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-148', 'DE-US-1', 'Insertó el nomenclador Cargo con el nombre elena', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-149', 'DE-US-1', 'Eliminó el nomenclador Cargo', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-150', 'DE-US-1', 'Eliminó el nomenclador Cargo', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-151', 'DE-US-1', 'Eliminó el nomenclador Cargo', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-152', 'DE-US-1', 'Modificó el nomenclador Cargo con el nombre carlos', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-153', 'DE-US-1', 'Modificó el nomenclador Cargo con el nombre carlos', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-154', 'DE-US-1', 'Modificó el nomenclador Cargo con el nombre carlos1', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-155', 'DE-US-1', 'Eliminó el nomenclador Cargo', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-157', 'DE-US-1', 'Insertó el nomenclador Órgano con el nombre s', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-158', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre s', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-159', 'DE-US-1', 'Modificó el nomenclador Órgano con el nombre ee', '2013-07-20');
INSERT INTO user_actions (actions, users, name_actions, fecha) VALUES ('DE-NOM-160', 'DE-US-1', 'Eliminó el nomenclador Órgano', '2013-07-20');


--
-- TOC entry 2077 (class 0 OID 58145)
-- Dependencies: 201
-- Data for Name: user_organo; Type: TABLE DATA; Schema: utiles; Owner: postgres
--

INSERT INTO user_organo (users, organo, sube) VALUES ('User001', 'DE-OR-1', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('User001', 'DE-OR-5', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('User001', 'DE-OR-16', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('User001', 'DE-OR-60', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('User001', 'DE-OR-7', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('User001', 'DE-OR-11', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('User001', 'DE-OR-10', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('User001', 'DE-OR-12', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-3', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-1', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-9', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-6', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-5', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-7', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-16', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-60', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-11', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-10', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-12', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-13', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-14', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-2', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-26', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-31', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-67', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-29', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-28', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-32', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-30', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-63', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-61', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-62', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-65', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-66', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-64', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-8', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-15', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-21', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0002', 'DE-OR-4', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0003', 'DE-OR-5', true);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0003', 'DE-OR-1', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0003', 'DE-OR-11', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0003', 'DE-OR-26', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0003', 'DE-OR-29', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0003', 'DE-OR-28', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0003', 'DE-OR-32', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0003', 'DE-OR-30', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('Usr-0003', 'DE-OR-66', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('DE-Usr-88', 'DE-OR-65', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('DE-Usr-88', 'DE-OR-32', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('DE-Usr-88', 'DE-OR-26', false);
INSERT INTO user_organo (users, organo, sube) VALUES ('DE-Usr-88', 'DE-OR-13', true);


--
-- TOC entry 2078 (class 0 OID 58152)
-- Dependencies: 202
-- Data for Name: users; Type: TABLE DATA; Schema: utiles; Owner: postgres
--

INSERT INTO users (id, name, cargo, email, activo, dias) VALUES ('User002', 'Carlos', 'DE-DI-21', 'test2@software12.apr.geocuba.cu', true, 20);
INSERT INTO users (id, name, cargo, email, activo, dias) VALUES ('User001', 'Mercedes Y. Nuñez Gato', 'DE-DI-14', 'docweb1@software12.apr.geocuba.cu', true, 12);


SET search_path = system, pg_catalog;

--
-- TOC entry 2058 (class 2606 OID 58201)
-- Name: pronostico_pkey; Type: CONSTRAINT; Schema: system; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY pronostico
    ADD CONSTRAINT pronostico_pkey PRIMARY KEY (id);


--
-- TOC entry 2060 (class 2606 OID 58203)
-- Name: seguridad_pkey; Type: CONSTRAINT; Schema: system; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY seguridad
    ADD CONSTRAINT seguridad_pkey PRIMARY KEY (id);


SET search_path = utiles, pg_catalog;

--
-- TOC entry 2062 (class 2606 OID 58205)
-- Name: config_pkey; Type: CONSTRAINT; Schema: utiles; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY configuracion
    ADD CONSTRAINT config_pkey PRIMARY KEY (siglas);


--
-- TOC entry 2064 (class 2606 OID 58207)
-- Name: update_time_pkey; Type: CONSTRAINT; Schema: utiles; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY update_time
    ADD CONSTRAINT update_time_pkey PRIMARY KEY (id);


--
-- TOC entry 2066 (class 2606 OID 58209)
-- Name: user_actions_pkey; Type: CONSTRAINT; Schema: utiles; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_actions
    ADD CONSTRAINT user_actions_pkey PRIMARY KEY (actions);


--
-- TOC entry 2068 (class 2606 OID 58211)
-- Name: user_organo_pkey; Type: CONSTRAINT; Schema: utiles; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_organo
    ADD CONSTRAINT user_organo_pkey PRIMARY KEY (users, organo);


--
-- TOC entry 2070 (class 2606 OID 58213)
-- Name: users_pkey; Type: CONSTRAINT; Schema: utiles; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2084 (class 0 OID 0)
-- Dependencies: 220
-- Name: fn_get_id(); Type: ACL; Schema: utiles; Owner: postgres
--

REVOKE ALL ON FUNCTION fn_get_id() FROM PUBLIC;
REVOKE ALL ON FUNCTION fn_get_id() FROM postgres;
GRANT ALL ON FUNCTION fn_get_id() TO postgres;
GRANT ALL ON FUNCTION fn_get_id() TO PUBLIC;


--
-- TOC entry 2086 (class 0 OID 0)
-- Dependencies: 221
-- Name: fn_update_data_user(character varying, character varying, character varying, integer); Type: ACL; Schema: utiles; Owner: postgres
--

REVOKE ALL ON FUNCTION fn_update_data_user(character varying, character varying, character varying, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION fn_update_data_user(character varying, character varying, character varying, integer) FROM postgres;
GRANT ALL ON FUNCTION fn_update_data_user(character varying, character varying, character varying, integer) TO postgres;
GRANT ALL ON FUNCTION fn_update_data_user(character varying, character varying, character varying, integer) TO PUBLIC;


--
-- TOC entry 2088 (class 0 OID 0)
-- Dependencies: 222
-- Name: fn_update_date_action(character varying, character varying[], character varying[]); Type: ACL; Schema: utiles; Owner: postgres
--

REVOKE ALL ON FUNCTION fn_update_date_action(character varying, character varying[], character varying[]) FROM PUBLIC;
REVOKE ALL ON FUNCTION fn_update_date_action(character varying, character varying[], character varying[]) FROM postgres;
GRANT ALL ON FUNCTION fn_update_date_action(character varying, character varying[], character varying[]) TO postgres;
GRANT ALL ON FUNCTION fn_update_date_action(character varying, character varying[], character varying[]) TO PUBLIC;


--
-- TOC entry 2090 (class 0 OID 0)
-- Dependencies: 223
-- Name: fn_update_user_action(character varying, character varying[], character varying[]); Type: ACL; Schema: utiles; Owner: postgres
--

REVOKE ALL ON FUNCTION fn_update_user_action(character varying, character varying[], character varying[]) FROM PUBLIC;
REVOKE ALL ON FUNCTION fn_update_user_action(character varying, character varying[], character varying[]) FROM postgres;
GRANT ALL ON FUNCTION fn_update_user_action(character varying, character varying[], character varying[]) TO postgres;
GRANT ALL ON FUNCTION fn_update_user_action(character varying, character varying[], character varying[]) TO PUBLIC;


-- Completed on 2014-08-10 21:44:25

--
-- PostgreSQL database dump complete
--

