/*
 *  Project   : KYPO
 *
 *  Tool      : emptyTemplatePortlet
 *
 *  Author(s) : Dalibor Toth totik@mail.muni.cz
 *
 *  Date      : 30. 9. 2015
 *
 *  (c) Copyright 2015 MASARYK UNIVERSITY
 *  All rights reserved.
 *
 *  This software is freely available for non-commercial use under license
 *  specified in following license agreement in LICENSE file. Please review the terms
 *  of the license agreement before using this software. If you are interested in
 *  using this software commercially orin ways not allowed in aforementioned
 *  license, feel free to contact Technology transfer office of the Masaryk university
 *  in order to negotiate ad-hoc license agreement.
 */


package cz.muni.ics.kypo.portlets.emptyTemplatePortlet.controllers;

import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.portlet.bind.annotation.RenderMapping;

@Controller(value = "sampleEditController")
@RequestMapping("EDIT")
public class SampleEditController {

    @RenderMapping
    public String handleRenderRequest(RenderRequest request, RenderResponse response, Model model) {

        return "templateEdit";
    }
}
